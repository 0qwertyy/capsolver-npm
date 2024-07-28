require("dotenv").config();
const solver = new (require("../../../src/Solver"))(process.env.APIKEY);
(async function () {
    // https://docs.capsolver.com/guide/captcha/ReCaptchaV2.html
    await solver.recaptchav2enterprise({
        websiteURL: "https://login.yahoo.net",
        websiteKey: "6Ldbp6saAAAAAAwuhsFeAysZKjR319pRcKUitPUO",
        proxy: process.env.PROXYSTRING
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();