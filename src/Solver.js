require("dotenv").config();
const axios = require("axios");

const Handler = require("./Handler");
const TaskException = require("./Exception");

class Solver {
    constructor(apiKey = process.env.APIKEY ?? "", verbose = 0, rqDelay = 1700) {
        this.apiKey = apiKey;
        this.verbose = verbose;
        this.rqDelay = rqDelay;
    }

    async balance() {
        try {
            let res = await axios.post("https://api.capsolver.com/getBalance", { clientKey: this.apiKey });
            let data = res.data;
            if (data["errorId"] !== 0) {
                throw new TaskException("Failed to retrieve balance", data);
            }
            return data.balance ? parseFloat(data.balance) : data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async runCustomTaskType({
        task,
        mustPoll = true
    }) {
        return new Promise((resolve, reject) => {
            if (task.hasOwnProperty("type")) {
                let handler = new Handler({
                    task,
                    apiKey: this.apiKey,
                    verbose: this.verbose,
                    mustPoll
                });
                resolve( handler.execute() );
            } else {
                reject( new TypeError(`Type of task is required. Usage: await handler.runAnyTask({ "type": "AntiTurnstileTaskProxyLess", ... })`) );
            }
        });
    }

    async mtcaptcha({ websiteURL, websiteKey, proxy }) {
        return await (new Handler({
            task: {
                type: "MTCaptchaTask",
                websiteURL,
                websiteKey,
                proxy
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async image2text({ websiteURL = null, body, module = null, score = null, caseSensitive = null }) {
        return await (new Handler({
            task: {
                type: "ImageToTextTask",
                websiteURL,
                body,
                module,
                score,
                case: caseSensitive
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: false
        })).execute(this.rqDelay);
    }

    async hcaptchaclassification({ websiteURL = null, websiteKey = null, queries, question }) {
        return await (new Handler({
            task: {
                type: "HCaptchaClassification",
                websiteURL,
                websiteKey,
                queries,
                question
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: false
        })).execute(this.rqDelay);
    }

    async hcaptcha({ websiteURL, websiteKey, proxy, isInvisible = null, enterprisePayload = null, userAgent = null })
    {
        return await (new Handler({
            task: {
                type: "HCaptchaTask",
                websiteURL,
                websiteKey,
                proxy,
                userAgent,
                isInvisible,
                enterprisePayload
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async hcaptchaproxyless({ websiteURL, websiteKey, isInvisible = null, enterprisePayload = null, userAgent = null })
    {
        return await (new Handler({
            task: {
                type: "HCaptchaTask",
                websiteURL,
                websiteKey,
                userAgent,
                isInvisible,
                enterprisePayload
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav2({ websiteURL, websiteKey, proxy, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV2Task",
                websiteURL,
                websiteKey,
                proxy,
                pageAction,
                enterprisePayload,
                isInvisible,
                apiDomain,
                userAgent,
                cookie
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav2proxyless({ websiteURL, websiteKey, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV2TaskProxyLess",
                websiteURL,
                websiteKey,
                pageAction,
                enterprisePayload,
                isInvisible,
                apiDomain,
                userAgent,
                cookie
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav2enterprise({ websiteURL, websiteKey, proxy, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV2EnterpriseTask",
                websiteURL,
                websiteKey,
                proxy,
                pageAction,
                enterprisePayload,
                isInvisible,
                apiDomain,
                userAgent,
                cookie
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav2enterpriseproxyless({ websiteURL, websiteKey, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV2EnterpriseTaskProxyLess",
                websiteURL,
                websiteKey,
                pageAction,
                enterprisePayload,
                isInvisible,
                apiDomain,
                userAgent,
                cookie
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav3({ websiteURL, websiteKey, proxy, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV3Task",
                websiteURL,
                websiteKey,
                proxy,
                pageAction,
                enterprisePayload,
                apiDomain,
                userAgent,
                cookies
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav3proxyless({ websiteURL, websiteKey, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV3TaskProxyLess",
                websiteURL,
                websiteKey,
                pageAction,
                enterprisePayload,
                apiDomain,
                userAgent,
                cookies
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav3enterprise({ websiteURL, websiteKey, proxy, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV3EnterpriseTask",
                websiteURL,
                websiteKey,
                proxy,
                pageAction,
                enterprisePayload,
                apiDomain,
                userAgent,
                cookies
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async recaptchav3enterpriseproxyless({ websiteURL, websiteKey, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await (new Handler({
            task: {
                type: "ReCaptchaV3EnterpriseTaskProxyLess",
                websiteURL,
                websiteKey,
                pageAction,
                enterprisePayload,
                apiDomain,
                userAgent,
                cookies
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async datadome({ websiteURL, userAgent, captchaUrl, proxy }) {
        return await (new Handler({
            task: {
                type: "DatadomeSliderTask",
                websiteURL,
                userAgent,
                captchaUrl,
                proxy
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async funcaptcha({ websiteURL, websitePublicKey, data = null, userAgent = null, proxy }) {
        return await (new Handler({
            task: {
                type: "FunCaptchaTask",
                websiteURL,
                websitePublicKey,
                data,
                userAgent,
                proxy
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async funcaptchaproxyless({ websiteURL, websitePublicKey, data = null, userAgent = null }) {
        return await (new Handler({
            task: {
                type: "FunCaptchaTaskProxyLess",
                websiteURL,
                websitePublicKey,
                data,
                userAgent,
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async funcaptchaclassification({ websiteURL = null, websiteKey = null, images, module = null, question }) {
        return await (new Handler({
            task: {
                type: "FunCaptchaClassification",
                websiteURL,
                websiteKey,
                images,
                module,
                question
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: false
        })).execute(this.rqDelay);
    }

    async geetest({ websiteURL, gt = null, challenge = null, proxy, geetestApiServerSubdomain = null, captchaId = null }) {
        return await (new Handler({
            task: {
                type: "GeeTestTaskProxyLess",
                websiteURL,
                proxy,
                gt,                            // for geetestv3
                challenge,                     // for geetestv3
                captchaId,                     // for geetestv4
                geetestApiServerSubdomain
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async geetestproxyless({ websiteURL, gt = null, challenge = null, captchaId = null, geetestApiServerSubdomain = null }) {
        return await (new Handler({
            task: {
                type: "GeeTestTaskProxyLess",
                websiteURL,
                gt,                            // for geetestv3
                challenge,                     // for geetestv3
                captchaId,                     // for geetestv4
                geetestApiServerSubdomain
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async antiturnstile({ websiteURL, websiteKey, metadata = null }) {
        return await (new Handler({
            task: {
                type: "AntiTurnstileTaskProxyLess",
                websiteURL,
                websiteKey,
                metadata
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }

    async anticloudflare({ websiteURL, proxy, metadata = null, html = null }) {
        return await (new Handler({
            task: {
                type: "AntiCloudflareTask",
                websiteURL,
                proxy,
                metadata,
                html
            },
            apiKey: this.apiKey,
            verbose: this.verbose,
            mustPoll: true
        })).execute(this.rqDelay);
    }
}

module.exports = Solver;
