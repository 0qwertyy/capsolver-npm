require("dotenv").config();
const solver = new (require("../../../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/captcha/Geetest.html
    await solver.geetest({
        websiteURL: "https://699pic.com/",
        captchaId: "8e94098fc8fd6286eb4afb663ecece01",  // v4 required
        proxy: process.env.PROXYSTRING
    })
    .then(solution => { console.log(solution) })
    .catch(e => { console.log(e) })
})();