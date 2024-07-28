require("dotenv").config();
const solver = new (require("../../../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/captcha/ReCaptchaV2.html
    await solver.recaptchav2({
        websiteURL: "https://www.nakedcph.com/en/auth/view",
        websiteKey: "6LeNqBUUAAAAAFbhC-CS22rwzkZjr_g4vMmqD_qo",
        proxy: process.env.PROXYSTRING
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();