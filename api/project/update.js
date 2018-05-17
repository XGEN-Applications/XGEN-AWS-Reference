'use strict';
const response = require('../../helpers/parse_response');
const { update } = require('../../helpers/project/crud');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const project = event.body;
  try {
    const data = await update(project);
    return response(200, data);
  } catch(err) {
    const { statusCode, error } = err;   
    return response(statusCode || 500, error || 'server error');
  }

};

module.exports = { handler };