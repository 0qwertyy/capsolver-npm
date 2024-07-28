require("dotenv").config();
const solver = new (require("../src/Solver"))(process.env.APIKEY);

(async function () {
    await solver.balance()
        .then(b => { console.log(b) })  // float USD balance
        .catch(e => { console.log(e) })
})();