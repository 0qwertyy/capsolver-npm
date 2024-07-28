require("dotenv").config();
const solver = new (require("../../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/captcha/FunCaptcha.html
    await solver.funcaptchaproxyless({
        websiteURL: "https://auth.discoveryplus.com/",
        websitePublicKey: "FE296399-FDEA-2EA2-8CD5-50F6E3157ECA",
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();