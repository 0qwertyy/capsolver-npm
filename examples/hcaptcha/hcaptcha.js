require("dotenv").config();
const solver = new (require("../../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/captcha/HCaptcha.html
    await solver.hcaptcha({
        websiteURL: "https://riotgames.com/",
        websiteKey: "019f1553-3845-481c-a6f5-5a60ccf6d830",
        proxy: process.env.PROXYSTRING,
        isInvisible: false,         // not invisible captcha impl
        enterprisePayload: null,    // not enterprise captcha impl
        userAgent: null             // not enterprise captcha impl
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();