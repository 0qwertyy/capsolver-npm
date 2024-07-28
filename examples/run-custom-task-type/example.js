require("dotenv").config();
const solver = new (require("../../src/Solver"))(process.env.APIKEY);

(async function () {
    await solver.runCustomTaskType({
        task: {
            type: "HCaptchaTask",
            websiteURL: "https://riotgames.com/",
            websiteKey: "019f1553-3845-481c-a6f5-5a60ccf6d830",
            proxy: process.env.PROXYSTRING,
        },
        mustPoll: true  // indicates that the solution must be polled
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();