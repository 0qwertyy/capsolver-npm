require("dotenv").config();
const solver = new (require("../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/captcha/MtCaptcha.html
    await solver.mtcaptcha({
        websiteURL: "https://www.mtcaptcha.com/",
        websiteKey: "MTPublic-tqNCRE0GS",
        proxy: process.env.PROXYSTRING
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();