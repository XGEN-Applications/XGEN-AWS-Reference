'use strict';
const response = require('../../helpers/parse_response');
const { update } = require('../../helpers/project/crud');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const project = event.body;
  try {
    const data = await update(project);
    if(data.error) throw { statusCode: data.statusCode, error: data.error }
    return response(200, data);
  } catch (err) {
    const { statusCode, message } = err;   
    return response(statusCode || 500, message || 'server error' );
  }

};

module.exports = { handler };