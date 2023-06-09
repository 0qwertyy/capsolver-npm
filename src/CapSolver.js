const Tasker = require("./Tasker");
const axios = require("axios");

/**
 * CapSolver.io Tasks Handler
 */
class CapSolver {
    constructor(apikey, verbose=0, rqdelay=2500) { this.apikey = apikey; this.verbose = verbose; this.rqdelay = rqdelay; this.init(); }

    /** * Set-up handler **/
    init(){
        if(this.verbose === 2){ console.log('[' + this.constructor.name + '][Verbose level '+this.verbose+' running at: '+this.apikey+']'); }
    }

    /** * Return USD balance as float number **/
    async balance(){ let handled = await this.getBalance(); return  handled.apiResponse.balance ? parseFloat(handled.apiResponse.balance): handled; }

    /**
     * One request to api.capsolver.com/getBalance
     */
    async getBalance(){
        let self = this;
        let response = await axios({ method: 'post', url: 'https://api.capsolver.com/getBalance', headers: { }, data: { "clientKey": this.apikey } })
            .then(function (response) {
                if(self.verbose === 2){ console.log(response.data); }
                if(response.data.errorId !== 0){ return { 'error':-1, 'statusText':response.status, 'apiResponse':response.data } }
                return { 'error':0, 'statusText':response.status, 'apiResponse':response.data }
            })
            .catch(function (error) {
                if(error.response === undefined){ return error; }
                if(self.verbose === 2){ console.log(error); }
                return { 'error':-1, 'statusText':error.response.status, 'apiResponse':error.response.data }
            });
        if(this.verbose !== 0) { console.log('[' + this.constructor.name + '][getBalance][[' + response.statusText + '][' + parseFloat(response.apiResponse.balance) + ' USD]]'); }
        return response;
    }

    /**
     * Appends specific proxy connection details to taskData
     *
     * @param {object} tasker - tasker instance
     * @param {object} proxyInfo - proxy connection details schema
     */
    attachProxy(tasker, proxyInfo){
        if(proxyInfo.hasOwnProperty('proxy')){ tasker.taskData.proxy = proxyInfo.proxy }else{
            if(proxyInfo.proxyType !== null || true){ tasker.taskData.proxyType = proxyInfo.proxyType; }
            tasker.taskData.proxyAddress = proxyInfo.proxyAddress;
            tasker.taskData.proxyPort = proxyInfo.proxyPort;
            if(proxyInfo.proxyLogin !== null || true){ tasker.taskData.proxyLogin = proxyInfo.proxyLogin; }
            if(proxyInfo.proxyPassword !== null || true){ tasker.taskData.proxyPassword = proxyInfo.proxyPassword; }
        }
        if(this.verbose === 1) { console.log('['+ this.constructor.name +'][proxyInfo]['+proxyInfo.proxyAddress+':'+proxyInfo.proxyPort+']'); }
        return tasker;
    }

    /**
     * Handle results for one specific captcha task
     *
     * @param {object} taskData - taskData schema
     */
    async runAnyTask(taskData) {
        if(taskData.hasOwnProperty('type')){
            let tasker = new Tasker(null, this.apikey, this.verbose);
            tasker.taskData = taskData;
            if(taskData.hasOwnProperty('proxyInfo')){ this.attachProxy(tasker, taskData.proxyInfo); }
            let tasked = await tasker.createTask();
            if(tasked.error !== 0) return tasked;
            return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
        }else{ throw TypeError('taskData has not type property.'); }
    }

    /** Fast-bind methods **/
    /** img2txt **/
    async image2text(body){
        let tasker = new Tasker('ImageToTextTask', this.apikey, this.verbose);
        // binding
        tasker.taskData.body = body;
        return await tasker.createTask();
    }

    /** hcap **/
    async hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, enterprisePayload=null){
        let tasker = new Tasker('HCaptchaTask', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true; }
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async hcaptchaproxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, enterprisePayload=null){
        let tasker = new Tasker('HCaptchaTaskProxyless', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async hcaptchaclassification(question, base64, coordinate=true){
        let tasker = new Tasker('HCaptchaClassification', this.apikey, this.verbose);
        tasker.taskData.queries = base64;
        tasker.taskData.question = question;
        tasker.taskData.coordinate = coordinate;
        return await tasker.createTask();
    }

    /** recap **/
    async recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2Task', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(recaptchaDataSValue!==null) { tasker.taskData.recaptchaDataSValue = recaptchaDataSValue }
        if(cookies!==null) { tasker.taskData.cookies = cookies }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav2proxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2TaskProxyless', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(recaptchaDataSValue!==null) { tasker.taskData.recaptchaDataSValue = recaptchaDataSValue }
        if(cookies!==null) { tasker.taskData.cookies = cookies }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2EnterpriseTask', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        if(apiDomain!==null) { tasker.taskData.apiDomain = apiDomain; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(cookies!==null) { tasker.taskData.cookies = cookies; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2EnterpriseTaskProxyless', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        if(apiDomain!==null) { tasker.taskData.apiDomain = apiDomain; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(cookies!==null) { tasker.taskData.cookies = cookies; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null){
        let tasker = new Tasker('RecaptchaV3Task', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        tasker.taskData.pageAction = pageAction;
        if(minScore!==null) { tasker.taskData.minScore = minScore; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore=null){
        let tasker = new Tasker('RecaptchaV3TaskProxyless', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websiteKey = websiteKey;
        tasker.taskData.pageAction = pageAction;
        if(minScore!==null) { tasker.taskData.minScore = minScore; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    /** datadome **/
    async datadome(websiteURL, userAgent, captchaUrl, proxyInfo){
        let tasker = new Tasker('DataDomeSliderTask', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.captchaUrl = captchaUrl;
        tasker.taskData.userAgent = userAgent;
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    /** funcap **/
    async funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent = null, data=null){
        let tasker = new Tasker('FunCaptchaTask', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websitePublicKey = websitePublicKey;
        tasker.taskData.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(data!==null) { tasker.taskData.data = data; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent = null, data=null){
        let tasker = new Tasker('FunCaptchaTaskProxyless', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.websitePublicKey = websitePublicKey;
        tasker.taskData.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(data!==null) { tasker.taskData.data = data; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async funcaptchaclassification(base64, question){
        let tasker = new Tasker('FunCaptchaClassification', this.apikey, this.verbose);
        tasker.taskData.image = base64;
        tasker.taskData.question = question;
        return await tasker.createTask();
    }

    /** geetest **/
    async geetest(websiteURL, gt, challenge, geetestApiServerSubdomain, proxyInfo, version=null, userAgent=null, geetestGetLib=null, initParameters=null){
        let tasker = new Tasker('GeeTestTask', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.gt = gt;
        tasker.taskData.challenge = challenge;
        tasker.taskData.geetestApiServerSubdomain = geetestApiServerSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(geetestGetLib!==null) { tasker.taskData.geetestGetLib = geetestGetLib; }
        if(version!==null) { tasker.taskData.version = version; }
        if(initParameters!==null) { tasker.taskData.initParameters = initParameters; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async geetestproxyless(websiteURL, gt, challenge, geetestApiServerSubdomain, version=null, userAgent=null, geetestGetLib=null, initParameters=null){
        let tasker = new Tasker('GeeTestTaskProxyless', this.apikey, this.verbose);
        tasker.taskData.websiteURL = websiteURL;
        tasker.taskData.gt = gt;
        tasker.taskData.challenge = challenge;
        tasker.taskData.geetestApiServerSubdomain = geetestApiServerSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(geetestGetLib!==null) { tasker.taskData.geetestGetLib = geetestGetLib; }
        if(version!==null) { tasker.taskData.version = version; }
        if(initParameters!==null) { tasker.taskData.initParameters = initParameters; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    /** antikadasa **/
    async antikasada(pageURL, proxyInfo, onlyCD=null, userAgent=null){
        let tasker = new Tasker('isnotcaptcha', this.apikey, this.verbose);
        delete tasker.taskData.type;
        tasker.taskData.pageURL = pageURL;
        if(onlyCD!==null) { tasker.taskData.onlyCD = onlyCD; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask('https://api.capsolver.com/kasada/invoke');
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    /** antiakamaibmp **/
    async antiakamaibmp(packageName, version=null, deviceId=null, deviceName=null, count=null){
        let tasker = new Tasker('isnotcaptcha', this.apikey, this.verbose);
        delete tasker.taskData.type;
        tasker.taskData.packageName = packageName;
        if(version!==null) { tasker.taskData.version = version; }
        if(deviceId!==null) { tasker.taskData.version = deviceId; }
        if(deviceName!==null) { tasker.taskData.version = deviceName; }
        if(count!==null) { tasker.taskData.userAgent = count; }
        return await tasker.createTask('https://api.capsolver.com/akamaibmp/invoke');
    }

    // unsupported methods:
    // ❌ ReCaptchaV2Classification
    // ✅ HCaptchaClassification (added on 1.2.1)
    // ✅ FunCaptchaClassification (added on 1.2.4)
    // ✅ AntiKasadaTask (added on 1.2.4)
    // ✅ AntiAkamaiBMPTask (added on 1.2.4)

}

module.exports = CapSolver;
