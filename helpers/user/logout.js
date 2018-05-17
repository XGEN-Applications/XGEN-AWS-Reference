'use strict';

const handler = async (event, context) => {

  return await Promise.reject( {
    statusCode: 501,
    error: 'not implemented'
  })

};

module.exports = handler;