module.exports = {
    apps: [
        { name: "datadome", script: "./examples/datadome.js" },
        { name: "antiturnstile", script: "./examples/antiturnstile.js" },
        { name: "img2txt", script: "./examples/img2txt.js" },
        { name: "mtcaptcha", script: "./examples/mtcaptcha.js" },

        // hcaptcha
        { name: "hcaptchaclassification", script: "./examples/hcaptcha/hcaptcha_classification.js" },
        { name: "hcaptcha", script: "./examples/hcaptcha/hcaptcha.js" },
        { name: "hcaptchaproxyless", script: "./examples/hcaptcha/hcaptcha_proxyless.js" },

        // funcaptcha
        { name: "funcaptchaclassification", script: "./examples/funcaptcha/funcaptcha_classification.js" },
        { name: "funcaptcha", script: "./examples/funcaptcha/funcaptcha.js" },
        { name: "funcaptchaproxyless", script: "./examples/funcaptcha/funcaptcha_proxyless.js" },

        // recaptchav2
        { name: "recaptchav2", script: "./examples/recaptcha/v2/recaptchav2.js" },
        { name: "recaptchav2proxyless", script: "./examples/recaptcha/v2/recaptchav2_proxyless.js" },
        { name: "recaptchav2enterprise", script: "./examples/recaptcha/v2/recaptchav2_enterprise.js" },
        { name: "recaptchav2enterpriseproxyless", script: "./examples/recaptcha/v2/recaptchav2_enterprise_proxyless.js" },

        // recaptchav3
        { name: "recaptchav3", script: "./examples/recaptcha/v3/recaptchav3.js" },
        { name: "recaptchav3proxyless", script: "./examples/recaptcha/v3/recaptchav3_proxyless.js" },
        { name: "recaptchav3enterprise", script: "./examples/recaptcha/v3/recaptchav3_enterprise.js" },
        { name: "recaptchav3enterpriseproxyless", script: "./examples/recaptcha/v3/recaptchav3_enterprise_proxyless.js" },

        // geetestv3
        { name: "geetestv3", script: "./examples/geetest/v3/geetest.js" },
        { name: "geetestv3proxyless", script: "./examples/geetest/v3/geetest_proxyless.js" },

        // geetest v4
        { name: "geetestv4", script: "./examples/geetest/v4/geetest.js" },
        { name: "geetestv4proxyless", script: "./examples/geetest/v4/geetest_proxyless.js" },
    ]
}
