'use strict';

const response = require('../../helpers/parse_response');
const register = require('../../helpers/user/add_user');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const user = event.body;
    const result = await register(user);
    return response(200, 'success');
  }
  catch (err) {
    const { statusCode, message } = err;   
    return response(statusCode || 500, message || 'server error' );
  }

};

module.exports = { handler };