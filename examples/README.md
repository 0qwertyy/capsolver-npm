Test success rate (with PM2)
-

- **Run multiple tests, over a challenge, to perform see the success rate.**

1. Install pm2 globally:  `npm install -g pm2`.
2. Navigate to `capsolver-npm` root directory.
3. Control processes:
    - `pm2 start examples/pm2/ecosystem.config.js --only=recaptchav3enterpriseproxyless,recaptchav2enterpriseproxyless`
    - `pm2 delete all`.
4. Print logs for all process: `pm2 log`.