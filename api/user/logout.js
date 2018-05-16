'use strict';

const response = require('../../helpers/parse_response');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  // THIS ENDPOINT NEEDS TO BE DISCUSSED!
  // REDIS (ElasticCache) OR DB for sessin management?
  // 
  try {
    const token = event.token;
    const result = await logout(token)
    return response(200, 'success');
  }
  catch (err) {
    const { statusCode, error } = err;   
    return response(statusCode, error);
  }

};

module.exports = { handler };