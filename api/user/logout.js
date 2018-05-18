'use strict';

const response = require('../../helpers/parse_response');
const logout = require('../../helpers/user/logout');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { Authorization } = event.headers;
    const result = await logout(Authorization);
    return response(200, result);
  }
  catch (err) {
    const { statusCode, error } = err;   
    return response(statusCode || 500, error || 'server error');
  }

};

module.exports = { handler };