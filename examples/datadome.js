require("dotenv").config();
const solver = new (require("../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/antibots/datadome.html
    await solver.datadome({
        websiteURL: "https://allegro.pl/",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        captchaUrl: "https://geo.captcha-delivery.com/captcha/?initialCid=DAVfsaHuc~1lJNTKFkZF4ix4sFDHffsYNtWio9i_1Sv9MkZ~JXR5RxmuxI76~WhiQFAs39wLpbvE8~uze6FC91XEaCCvadHZPmAUp71wrKSCShmyABxSEvLoEzSAnd66&cid=DAVfsaHuc~1lJNTKFkZF4ix4sFDHffsYNtWio9i_1Sv9MkZ~JXR5RxmuxI76~WhiQFAs39wLpbvE8~uze6FC91XEaCCvadHZPmAUp71wrKSCShmyABxSEvLoEzSAnd66&referer=https%3A%2F%2Fallegro.pl%2F&hash=77DC0FFBAA0B77570F6B414F8E5BDB&t=fe&s=29701&e=9e3ce65fd6c57373d8ff7cb729a4e78a8ed3f43d0174456e125ba4816b40b060&ir=414&dm=dc_ir",
        proxy: process.env.PROXYSTRING
    })
        .then((solution) => { console.log(solution); })
        .catch(e => { console.log(e); });
})();