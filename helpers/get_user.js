const jwt = require('jsonwebtoken');
const db = require('./db');
const util = require('util');
const { JWT_SECRET } = require('../config/config');

const current = async () => {


  // access to API will be authorized through authorizer function
  // this is only query 
  try {

    const result = await db.query(`SELECT UserID, Email, FirstName, LastName FROM Users WHERE UserID=${UserID}`);
    return result[0];

  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }
  }


    

}

module.exports = current;