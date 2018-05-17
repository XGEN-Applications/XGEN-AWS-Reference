'use strict';

const response = require('../../helpers/parse_response');
const register = require('../../helpers/user/add_user');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const user = event.body;
    const { statusCode, error } = await register(user);
    if(error) throw { statusCode, error };
    return response(200, 'success');
  }
  catch (err) {
    const { statusCode, error } = err;   
    return response(statusCode, error);
  }

};

module.exports = { handler };