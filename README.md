# capsolver.com api wrapper🧠

- **Manage to solve captcha challenges with AI in a NodeJS app (captcha service based).**
- ❗ An API key it's **required**. [**Get here.**](https://dashboard.capsolver.com/passport/register?inviteCode=CHhA_5os)
- 👀 **Puppeteer-extra integration at**  [**puppeteer-extra-plugin-capsolver**](https://github.com/0qwertyy/puppeteer-extra-plugin-capsolver).

🔥 *Promise based* 🔥 *Catch TaskException with error code and description* 

[![](https://img.shields.io/badge/2.0.2-capsolver--npm-darkgreen?logo=npm&logoColor=white)](https://www.npmjs.com/package/capsolver-npm)
[![](https://img.shields.io/badge/documentation-docs.capsolver.com-darkgreen)](https://docs.capsolver.com/guide/getting-started.html)

# ⬇️ Install
`npm i capsolver-npm`

# ✋ Usage


❗ You need to debug each website and the captcha use case, in order to adjust the correct implementation parameters.

- Initialize `Solver` :
```javascript
const { Solver } = require("capsolver-npm");
const solver = new Solver("CAP-XXXXXX ...");  // one solver by apikey
```

- Handle any `api.capsolver.com` supported task.


# 📚 Docs


**Request a custom tasks (in case this lib doesn't support it yet):**

- It's possible to specify the task type within the JSON object and add the rest of parameters using `.runCustomTaskType({})`.
- `mustPoll` indicates if this task requires to poll the solution after create the task.
- When using proxy-required tasks, add your proxy connection matching the following:      
    - `{ proxy: "ip:port:user:pass", ... parameters }`

```javascript
const { Solver } = require("capsolver-npm");

const solver = new Solver("CAP-XXXXXX ...");
await solver.runCustomTaskType({ 
    task: {
        type: "AkamaiTask", // suppose this task exists at docs.capsolver.com
        proxy: "ip:port:user:pass" // custom proxy usage
        ... parameters
    }
    mustPoll: true
    })
    .then(solution => { console.log(solution) })
    .catch(e => { console.error(e) });
```

- Check the balance with `.balance()`.
```javascript
if(await solver.balance() < 5.00){
    console.log("Your CapSolver balance is under 5 USD")
}
```

📁 Working examples
-

**Figure out [here](https://github.com/0qwertyy/capsolver-npm/tree/master/examples).**

🔨 Native methods
-

- Parameters that have a `null` by default are optional sometimes, it depends on implementation.
- Read the *"Solving ..."* docs.

[***Solving recaptchav2***](https://docs.capsolver.com/guide/captcha/ReCaptchaV2.html)

```javascript
await solver.recaptchav2({ websiteURL, websiteKey, proxy, pageAction: null, enterprisePayload: null, isInvisible: false, apiDomain: null, userAgent: null, cookie: null });
await solver.recaptchav2proxyless({ websiteURL, websiteKey, pageAction: null, enterprisePayload: null, isInvisible: false, apiDomain: null, userAgent: null, cookie: null });
await solver.recaptchav2enterprise({ websiteURL, websiteKey, proxy, pageAction: null, enterprisePayload: null, isInvisible: false, apiDomain: null, userAgent: null, cookie: null });
await solver.recaptchav2enterpriseproxyless({ websiteURL, websiteKey, pageAction: null, enterprisePayload: null, isInvisible: false, apiDomain: null, userAgent: null, cookie: null });
```

[***Solving recaptchav3***](https://docs.capsolver.com/guide/captcha/ReCaptchaV3.html)

```javascript
await solver.recaptchav3({ websiteURL, websiteKey, proxy, pageAction, enterprisePayload: null, apiDomain: null, userAgent: null, cookies: null });
await solver.recaptchav3proxyless({ websiteURL, websiteKey, pageAction, enterprisePayload: null, apiDomain: null, userAgent: null, cookies: null });
await solver.recaptchav3enterprise({ websiteURL, websiteKey, proxy, pageAction, enterprisePayload: null, apiDomain: null, userAgent: null, cookies: null });
await solver.recaptchav3enterpriseproxyless({ websiteURL, websiteKey, pageAction, enterprisePayload: null, apiDomain: null, userAgent: null, cookies: null });
```

[***Solving hcaptcha***](https://docs.capsolver.com/guide/captcha/HCaptcha.html)
```javascript
await solver.hcaptcha({ websiteURL, websiteKey, proxy, isInvisible: null, enterprisePayload: null, userAgent: null })
await solver.hcaptchaproxyless({ websiteURL, websiteKey, isInvisible: null, enterprisePayload: null, userAgent: null })

// under manteniance at 27-07-2024
await solver.hcaptchaclassification({ websiteURL: null, websiteKey: null, queries, question })
```

[***Solving funcaptcha***](https://docs.capsolver.com/guide/captcha/FunCaptcha.html)

```javascript
await solver.funcaptcha({ websiteURL, websitePublicKey, data: null, userAgent: null, proxy });
await solver.funcaptchaproxyless({ websiteURL, websitePublicKey, data: null, userAgent: null })
await solver.funcaptchaclassification({ websiteURL: null, websiteKey: null, images, module: null, question });
```

[***Solving geetest V3 & V4***](https://docs.capsolver.com/guide/captcha/Geetest.html)

```javascript
await solver.geetest({ websiteURL, gt: null, challenge: null, proxy, geetestApiServerSubdomain: null, captchaId: null });
await solver.geetest_proxyless({ websiteURL, gt: null, challenge: null, captchaId: null, geetestApiServerSubdomain: null });
```

[***Solving datadome***](https://docs.capsolver.com/guide/antibots/datadome.html)

```javascript
await solver.datadome({ websiteURL, userAgent, captchaUrl, proxy });
```

[***Solving turnstile***](https://docs.capsolver.com/guide/antibots/cloudflare_turnstile.html)

```javascript
// under manteniance at 27-07-2024
await solver.antiturnstile({ websiteURL, websiteKey, metadata: null });
```

[***Solving mtcaptcha***](https://docs.capsolver.com/guide/captcha/MtCaptcha.html)

```javascript
await.solver.mtcatpcha({ websiteURL, websiteKey, proxy });
```

[***Solving image2text captcha***](https://docs.capsolver.com/guide/recognition/ImageToTextTask.html)

```javascript
await solver.image2text({ websiteURL: null, body, module: null, score: null, caseSensitive: null });
```

- ❌ Unsupported:
    - AwsWaf (token)
    - AwsWafClassification
    - ReCaptchaClassification
    - VisionEngine