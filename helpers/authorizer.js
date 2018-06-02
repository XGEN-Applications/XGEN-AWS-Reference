
'use strict';

const util = require('util');
const jwt = require('jsonwebtoken'); 
const verifyAsync = util.promisify(jwt.verify);
const { JWT_SECRET } = require('../config/config');
const { getSession } = require('./db');

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if(effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

const handler = async (event, context) => {
  
  try {
    const token = event.authorizationToken;
    const decoded = await verifyAsync(token, JWT_SECRET);
    const session = await getSession(decoded.id, token);
    if(session.error) throw 'unauthorized';
    console.log(event.methodArn);
    const result = generatePolicy(decoded.id, 'Allow', 'arn:aws:execute-api:us-east-1:892642394729:d5xmqy1jv4/production/*');
    return result;
  } catch(err) {
    console.log(err)
    return err;
  }

};

module.exports = { handler }

  
