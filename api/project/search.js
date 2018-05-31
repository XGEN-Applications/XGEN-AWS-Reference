'use strict';
const response = require('../../helpers/parse_response');
const { search } = require('../../helpers/project/search');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const terms = event.body;
  try {
    const data = await search(terms);
    return response(200, data);
  } catch (err) {
    const { statusCode, message } = err;   
    return response(statusCode || 500, message || 'server error' );
  }

};

module.exports = { handler };