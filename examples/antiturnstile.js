require("dotenv").config();
const solver = new (require("../src/Solver"))(process.env.APIKEY);

(async function () {
    // https://docs.capsolver.com/guide/antibots/cloudflare_turnstile.html
    await solver.antiturnstile({
        websiteURL: "https://peet.ws/turnstile-test/non-interactive.html",
        websiteKey: "0x4AAAAAAABS7vwvV6VFfMcD",
        metadata: { action: "login", cdata: "0000-1111-2222-3333-example-cdata" },
    })
        .then((solution) => { console.log(solution) })
        .catch(e => { console.error(e) })
})();