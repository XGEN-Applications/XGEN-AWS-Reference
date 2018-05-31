'use strict';
const getUser = require('../../helpers/user/get_user');
const response = require('../../helpers/parse_response');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  // principalId comes from authorizer functions (decoded.id from JWT)
  try {
    const data = await getUser(event.principalId);
    return response(200, data);
  } catch (err) {
    const { statusCode, message } = err;   
    return response(statusCode || 500, message || 'server error' );
  }


};

module.exports = { handler };