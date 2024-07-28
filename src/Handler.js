const axios = require("axios");
const sleep = ms => new Promise(r => setTimeout(r, ms));

const { TaskException } = require("./Exception");

class Handler {
    constructor({ task, apiKey, verbose, mustPoll = true }) {
        this.task = task;
        this.apiKey = apiKey;
        this.verbose = verbose;
        this.mustPoll = mustPoll;
        this.parameters = require("./Validation");
    }

    validate(task) {
        const parameters = Object.keys(this.parameters).reduce((acc, key) => {
            acc[key.toLowerCase()] = this.parameters[key];
            return acc;
        }, {});

        const typeParams = parameters[task.type.toLowerCase()];
        if (typeParams) {
            typeParams.forEach(param => {
                const value = task[param.name];
                if (param.required && (!value || typeof value !== param.type)) {
                    throw new TypeError(`${param.name} must be of type ${param.type} and not empty.`);
                }
            });
        } else if (this.verbose !== 0) {
            console.log(`capsolver-npm: running not recognized task ${task.type}]`);
        }

        return true;
    }

    async execute(rqDelay) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.mustPoll) {
                    await this.create().then(async (data) => {
                        resolve( await this.pollSolution(data.taskId, rqDelay) );
                    });
                } else {
                    resolve( (await this.create()).solution );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async create() {
        return new Promise(async (resolve, reject) => {
            this.validate( this.task );
            await axios({
                url: "https://api.capsolver.com/createTask",
                method: "POST",
                data: { clientKey: this.apiKey, appId: "AF0F28E5-8245-49FD-A3FD-43D576C0E9B3", task: this.task }
            }).then(res => {
                if (res.data.errorId !== 0) { reject(new TaskException("Failed to create task", res.data)); }
                resolve(res.data); 
            }).catch(e => {
                reject(new TaskException("Failed to create task", e.response ? e.response.data : { errorCode: e.message }));
            });

        });
    }

    async pollSolution(taskId, rqDelay) {
        return new Promise(async (resolve, reject) => {
            const req = { method: "post", url: "https://api.capsolver.com/getTaskResult", data: { clientKey: this.apiKey, taskId } };
            let threshold = 0;

            while (threshold <= 10) {
                await sleep(rqDelay);
                
                try {
                    const res = await axios(req);
                    if (res.data.errorId !== 0) { reject(new TaskException("Failed to retrieve task result", res.data )); break; }
                    if (this.verbose !== 0) console.log(`capsolver-npm: { "id" : "${taskId}", "status": "${res.data.status}" }`);
                    if (res.data.status === "ready") { resolve(res.data.solution ? res.data.solution : res.data); break; }
                } catch (error) {
                    threshold++;
                }
            }

            reject(new TaskException("Failed to retrieve task result", { code: "unknown", description: "Contact at https://github.com/0qwertyy/capsolver-npm/issues" }));
        });
    }
}

module.exports = Handler;
