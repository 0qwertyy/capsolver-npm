require("dotenv").config();
const solver = new (require("../../../src/Solver"))(process.env.APIKEY);

const axios = require("axios");

(async function () {
    // In case of v3, challenge must be refreshed every time
    const res = await axios.get("https://segmentfault.com/gateway/geetest/token");

    // https://docs.capsolver.com/guide/captcha/Geetest.html
    await solver.geetest({
        websiteURL: "https://segmentfault.com/",
        gt: res.data.gt,                // v3 required
        challenge: res.data.challenge,  // v3 required
        proxy: process.env.PROXYSTRING
    })
    .then(solution => { console.log(solution) })
    .catch(e => { console.log(e) })
})();