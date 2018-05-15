'use strict';

const response = require('../../helpers/parse_response');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  await Promise.resolve();
  return response(200, 'TODO: userdata');

};

module.exports = { handler };