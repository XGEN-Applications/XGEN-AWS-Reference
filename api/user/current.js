'use strict';
const getUser = require('../../helpers/get_user');
const response = require('../../helpers/parse_response');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  // principalId comes from authorizer functions (decoded.id from JWT)
  const data = await getUser(event.principalId);
  return response(200, data);

};

module.exports = { handler };