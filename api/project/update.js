'use strict';
const response = require('../../helpers/parse_response');
const { update } = require('../../helpers/project/crud');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  return response(501, 'not implemented');

};

module.exports = { handler };