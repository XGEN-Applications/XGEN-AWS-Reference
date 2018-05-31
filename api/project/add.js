'use strict';
const response = require('../../helpers/parse_response');
const { add } = require('../../helpers/project/crud');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const project = event.body;
    const data = await add(project);
    return response(200, data);
  } catch (err) {
    const { statusCode, message } = err;   
    return response(statusCode || 500, message || 'server error' );
  }

};

module.exports = { handler };