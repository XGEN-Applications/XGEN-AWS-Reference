'use strict';

const response = require('../../helpers/parse_response');
const verify = require('../../helpers/user/verify_user');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const user = event.body;
    const { statusCode, error, token } = await verify(user);
    if(error) throw { statusCode, error };
    return response(200, { token });
  }
  catch (err) {
    const { statusCode, error } = err;   
    return response(statusCode, error);
  }

};

module.exports = { handler };