const Validation = require('./Validation');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const axios = require('axios');

class Tasker {
    constructor(type, apiKey, verbose) {
        this.apikey = apiKey;
        this.verbose = verbose;
        this.parameters = new Validation().parameters;
        this.taskData = { 'type' : type };
    }

    /**
     * api.capsolver.com/createTask
     */
    async createTask(url=undefined) {
        let self = this;
        this.validate(this.taskData);
        let req = { url: (url === undefined) ? 'https://api.capsolver.com/createTask' : url, headers: { }, method: 'post', data: { 'clientKey': this.apikey.toString(), 'appId': 'AF0F28E5-8245-49FD-A3FD-43D576C0E9B3', 'task': this.taskData } };
        let handled = await axios(req)
            .then(async function (response) {
                if(self.verbose === 2){ console.log(response.data); }
                if(response.data.errorId !== 0){ return { 'error':-1, 'statusText':response.status, 'apiResponse':response.data } }
                return { 'error':0, 'statusText':response.status, 'apiResponse':response.data, 'solution':response.data.solution }
            })
            .catch(function (error) {
                if(error.response === undefined){ return error; }
                if(self.verbose === 2){ console.log(error.response.data); }
                return { 'error':-1, 'statusText':error.response.status, 'apiResponse':error.response.data }
            });
        if(this.verbose !== 0){ console.log('[' + this.taskData.type + ']['+handled.statusText+'][' + req.url + ']'); }
        return handled;
    }

    /**
     * api.capsolver.com/getTaskResult - retrieve results loop
     * @param {string} taskId - associated taskId
     * @param {number} rqDelay - retrieve results delay in ms
     */
    async getTaskResult(taskId, rqDelay){
        let self = this; let status = ''; let fails = 0; let handled = null;
        if(taskId === undefined) return;
        let requestData = { 'clientKey':this.apikey, 'taskId': taskId };
        let req = { method: 'post', url: 'https://api.capsolver.com/getTaskResult', headers: { }, data: requestData };
        while(status !== 'ready'){
            await sleep(rqDelay);
            if(fails > 10) break;
            handled = await axios(req)
                .then(async function (response) {
                    if(self.verbose === 2){ console.log(requestData); }
                    if(response.data.errorId !== 0){
                        status = response.data.errorDescription;
                        return { 'error':-1, 'statusText':response.status, 'apiResponse':response.data }
                    }
                    status = response.data.status;
                    return { 'error':0, 'statusText':response.status, 'apiResponse':response.data, 'solution':response.data.solution }
                })
                .catch(function (error) {
                    if(self.verbose === 2){ console.log(error.response.data); }
                    fails++;
                    return { 'error':-1, 'statusText':error.response.status, 'apiResponse':error.response.data }
                });
            if(this.verbose !== 0)
                console.log('[' + this.taskData.type + ']['+handled.statusText+'][api.capsolver.com/getTaskResult][for: ' + (this.taskData.websiteURL ? this.taskData.websiteURL : this.taskData.captchaUrl) + '][taskId: '+taskId+'][status: '+status+']');
            if(this.verbose === 2){ console.log(handled.apiResponse)}
            if(handled.error !== 0) break;
        }
        return handled;
    }

    /**
     * Validate captcha task required parameters
     * @param {object} taskData - taskData schema
     */
    validate(taskData){
        const parameters = Object.keys(this.parameters).reduce((c, k) => (c[k.toLowerCase()] = this.parameters[k], c), {});
        if(Object.keys(parameters).includes(taskData.type.toLowerCase())){ // ?is a existing captcha task
            this.parameters[taskData.type].forEach(parameter => {
                if(parameter.required){
                    if(taskData[parameter.name] === undefined
                        || String(taskData[parameter.name]).length <= 0
                        || typeof taskData[parameter.name] !== parameter.type){
                        throw TypeError(parameter.name+' must by of type '+parameter.type+' and not empty.');
                    }
                }else{
                    if(taskData[parameter.name] !== undefined || null){
                        if(String(taskData[parameter.name]).length <= 0
                            || typeof taskData[parameter.name] !== parameter.type) {
                            throw TypeError(parameter.name+' must by of type '+parameter.type+' and not empty.');
                        }
                    }
                }
            });
        }else{
            throw Error(taskData.type+' is not a valid captcha task type.');
        }
        // process.exit(1)
        return true;
    }

}

module.exports = Tasker;