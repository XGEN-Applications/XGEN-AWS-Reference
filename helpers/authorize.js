
const jwt = require('jsonwebtoken'); 
const { JWT_SECRET } = require('../config/config');

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

const unathorized = { statusCode: 403, error: 'unauthorized'}

const authorize = (event, context, cb) => {
  
  try {

    const { token } = event;

    if(!token) {
      throw unathorized;
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if(err) {
        throw unathorized; 
      }
      return cb(null, generatePolicy(user.id, 'Allow', event.methodArn))
    });

  }
  catch(err) {
    return cb(err);
  }
};

module.exports = { authorize }