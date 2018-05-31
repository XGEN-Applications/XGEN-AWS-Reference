'use strict';

const response = require('../../helpers/parse_response');
const verify = require('../../helpers/user/verify_user');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const user = event.body;
    const { token } = await verify(user);
    return response(200, { token });
  }
  catch (err) {
    const { statusCode, message } = err;   
    return response(statusCode || 500, message || 'server error' );
  }

};

module.exports = { handler };