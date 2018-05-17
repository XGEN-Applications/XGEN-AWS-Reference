# XGEN-AWS-Reference

### install aws cli 

[AWS Docs](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

### configure aws credentials

- run in terminal `aws configure` and follow wizard
- access keys from IAM are needed, region and default format (JSON).

### setup dev environment

- install nodejs [LTS version](https://nodejs.org/en/)
- run in terminal `npm install -g serverless`
- clone this repository
- inside project root folder run in terminal `npm install`

### configuration 

- all configuration options can be found inside config/config.js file, which is added to `.gitignore` file in order to avoid commiting secrets to the repository
- `./config/sample.config.js` file is provided with all required and available settings. add `./config/config.js` file to the same folder, copy configuration from `sample.config.js`, then update values with your own settings. Once again, `config.js` has been added to `.gitignore`, it will not be commited to the git repository. 

### deploy to aws

- run in terminal `sls deploy --stage dev`

Note: You can have different environments. --stage param can be dev, production or staging 

### uninstall from aws 

- run in terminal `sls remove --stage dev`

Note: Same rules for stage param as for deployment. 

### invoke functions locally

- run in terminal `sls offline start`
- use [Postman](https://www.getpostman.com/) or similar tool to invoke functions on the localhost

### tests

- test tool used: [Jest](https://facebook.github.io/jest)
- run in terminal `npm test`




