const jwt = require('jsonwebtoken');
const { query } = require('../db');
const util = require('util');
const { JWT_SECRET } = require('../../config/config');

const current = async (id) => {

  try {
    const result = await query(`SELECT UserID, Email, FirstName, LastName FROM Users WHERE UserID=${id}`);
    return !!result.length ? result[0] : {};
  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }
  }

}

module.exports = current;