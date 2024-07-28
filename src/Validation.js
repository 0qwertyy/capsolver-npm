const parameters = {
    ImageToTextTask: [
        { name: "body", required: false, type: "string" },
        { name: "module", required: false, type: "string" },
        { name: "score", required: false, type: "number" },
        { name: "case", required: false, type: "boolean" }
    ],

    AwsWafClassification: [
        { name: "images", required: false, type: "object" },
        { name: "question", required: false, type: "string" },
        { name: "score", required: false, type: "number" },
        { name: "case", required: false, type: "boolean" }
    ],

    BinanceCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "validateId", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "proxyPassword", required: false, type: "string" }
    ],

    MtCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "proxyPassword", required: false, type: "string" }
    ],

    MtCaptchaTaskProxyLess: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" }
    ],

    HCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
    ],

    HCaptchaTaskProxyLess: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
    ],

    HCaptchaEnterpriseTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "isEnterprise", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
    ],

    HCaptchaEnterpriseTaskProxyLess: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "isEnterprise", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
    ],

    HCaptchaTurboTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "isEnterprise", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
    ],

    HCaptchaClassification: [
        { name: "question", required: false, type: "string" },
        { name: "queries", required: false, type: "object" }
    ],

    RecaptchaV2Task: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "recaptchaDataSValue", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
    ],

    RecaptchaV2TaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "recaptchaDataSValue", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" }
    ],

    RecaptchaV2EnterpriseTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "apiDomain", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
    ],

    RecaptchaV2EnterpriseTaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "apiDomain", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" }
    ],

    RecaptchaV3Task: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "pageAction", required: false, type: "string" },
        { name: "minScore", required: false, type: "number" },
        { name: "proxy", required: false, type: "string" }
    ],

    RecaptchaV3TaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "pageAction", required: false, type: "string" },
        { name: "minScore", required: false, type: "number" }
    ],

    ReCaptchaV2Classification: [
        { name: "question", required: false, type: "string" },
        { name: "image", required: false, type: "string" }
    ],

    GeeTestTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "gt", required: false, type: "string" },
        { name: "challenge", required: false, type: "string" },
        { name: "geetestApiServerSubdomain", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "captchaId", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
    ],

    GeeTestTaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "gt", required: false, type: "string" },
        { name: "challenge", required: false, type: "string" },
        { name: "geetestApiServerSubdomain", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "captchaId", required: false, type: "string" }
    ],

    DataDomeSliderTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "captchaUrl", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "proxyPassword", required: false, type: "string" }
    ],

    FunCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websitePublicKey", required: false, type: "string" },
        { name: "funcaptchaApiJSSubdomain", required: false, type: "string" },
        { name: "data", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
    ],

    FunCaptchaClassification: [
        { name: "image", required: false, type: "string" },
        { name: "question", required: false, type: "string" }
    ],

    FunCaptchaTaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websitePublicKey", required: false, type: "string" },
        { name: "funcaptchaApiJSSubdomain", required: false, type: "string" },
        { name: "data", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" }
    ],

    AntiCloudflareTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "metadata", required: false, type: "object" },
        { name: "proxy", required: false, type: "string" },
    ]

};

module.exports = parameters;