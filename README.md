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
- install [Redis](https://redis.io/topics/quickstart)

### configuration 

- all configuration options can be found inside config/config.js file, which is added to `.gitignore` file in order to avoid commiting secrets to the repository
- `./config/sample.config.js` file is provided with all required and available settings. add `./config/config.js` file to the same folder, copy configuration from `sample.config.js`, then update values with your own settings. Once again, `config.js` has been added to `.gitignore`, it will not be commited to the git repository. 
- Redis have key expiration time in seconds. This is used to determine token validity duration time. When token expires it becomes invalid.

### deploy to aws

- run in terminal `serverless deploy --stage dev`

Note: You can have different environments. --stage param can be dev, production or staging 

Every stage you deploy to with serverless.yml using the aws provider is a single AWS CloudFormation stack. This is where your AWS Lambda functions and their event configurations are defined and it's how they are deployed. When you add resources those resources are added into your CloudFormation stack upon serverless deploy.

### uninstall from aws 

- run in terminal `serverless remove --stage dev`

Note: Same rules for stage param as for deployment. 

### invoke functions locally

- run in terminal `serverless offline start`
- use [Postman](https://www.getpostman.com/) or similar tool to invoke functions on the localhost

### tests

- test tool used: [Jest](https://facebook.github.io/jest)
- run in terminal `npm test -- --runInBand` or be specific and run for example `npm test login`

### LIST OF TOOLS AND FRAMEWORKS USED

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
- [NodeJS](https://nodejs.org/en/)
- [Serverless](https://serverless.com/)
- [Jest](https://facebook.github.io/jest/)
- [Redis](https://redis.io)


### PROJECT FOLDER/FILES ORGANIZATION

- `serverless.yml` contains serverless framework configuration. All API's and other resources used are configured in this file. 

- `api` contains API Gateway Lambda Endpoints 
- `config` configuration settings
- `helpers` shared methods and code behind API's
- `test` unit tests

- `./helpers/db.js` mysql/aurora connection pool shared by all lambdas
- `./helpers/authorizer.js` functions that handles authorization based on user JWT session 
- `./helpers/parse_response` Lambda API requires that all response objects contains JSON with statusCode and body. It returns formated response with statusCode, header and body that contains stringified data object passed to the function. 

### available endpoints

Default offline API link is [http://localhost:3000](http://localhost:3000). When you deploy to AWS, you will get the generated link for the endpoints. You can use that link or connect AWS Route53 with the custom domain.

- POST **{your_aws_url_or_localhost}/users/register**

```
Accepts JSON body {
  "username",
  "password",
  "firstName",
  "lastName"
} 

Register user.
```

- POST **{your_aws_url_or_localhost}/users/login**

```
Accepts JSON body {
  "username",
  "password"
} 

Login user, returns token.
```

- GET **{your_aws_url_or_localhost}/users/current**

```
Accepts header with token returned from login {
  "Authorization"
} 

Returns currently logged in user.
```

- GET **{your_aws_url_or_localhost}/projects**

```
Accepts header with token returned from login {
  "Authorization"
} 

Returns all projects.
```

- GET **{your_aws_url_or_localhost}/projects/{id}**

```
Accepts header with token returned from login {
  "Authorization"
} 

Returns single project when ProjectID is passed as path parameter.
```


- POST **{your_aws_url_or_localhost}/projects**

```
Accepts header with token returned from login {
  "Authorization"
} 

Accepts JSON body {
  Project Document
}  

Creates project, returns ProjectID.
```

- PUT **{your_aws_url_or_localhost}/projects**

```
Accepts header with token returned from login {
  "Authorization"
}

Accepts JSON body {
  Project Document with id
}  

Updates project.
```

- DELETE **{your_aws_url_or_localhost}/projects/{id}**

```
Accepts header with token returned from login {
  "Authorization"
} 

Deletes single project when ProjectID is passed as path parameter.
```


- POST **{your_aws_url_or_localhost}/projects/search**

```
Accepts header with token returned from login {
  "Authorization"
} 

Accepts JSON body {
  Search criteria fields
}  

Search project by given criteria. Returns list of projects.
```
