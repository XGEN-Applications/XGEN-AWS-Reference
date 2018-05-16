'use strict';
const response = require('../../helpers/parse_response');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  return response(501, 'not implemented');

};

module.exports = { handler };