'use strict';
const response = require('../../helpers/parse_response');
const { deleteProject } = require('../../helpers/project/crud');

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const { id } = event.path;
  try {
    const data = await deleteProject(id);
    return response(200, data);
  } catch(err) {
    const { statusCode, error } = err;   
    return response(statusCode || 500, error || 'server error');
  }

};

module.exports = { handler };