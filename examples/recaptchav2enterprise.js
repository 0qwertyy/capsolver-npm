const CapSolver = require('../src/CapSolver');
const handler = new CapSolver('CAI-XXX...', 1);

(async function () {
    await handler.recaptchav2enterpriseproxyless('https://login.yahoo.net', '6Ldbp6saAAAAAAwuhsFeAysZKjR319pRcKUitPUO')
        .then(response => {
            if (response.error === 0) {
                console.log(response.solution)
            } else {
                console.log('error ' + JSON.stringify(response.apiResponse))
            }
        })
})();