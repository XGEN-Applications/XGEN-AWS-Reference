'use strict';
const response = require('../../helpers/parse_response');
const { search } = require('../../helpers/project/search');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const terms = event.body;
  try {
    const data = await search(terms);
    return response(200, data);
  } catch(err) {
    console.log(err)
    const { statusCode, error } = err;   
    return response(statusCode || 500, error || 'server error');
  }

};

module.exports = { handler };