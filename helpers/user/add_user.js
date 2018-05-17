const bcrypt = require('bcrypt');
const db = require('../db');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 16);
}

const validEmail = (email) => {
  const emailRegEx = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
  return emailRegEx.test(email);
}

const register = async (user) => {

  try {

    const { username, password, firstName, lastName } = user;
    
    if(!validEmail(username)) {
      throw { statusCode: 400, error: 'invalid email'};
    }

    if(!password || password.length < 6) {
      throw { statusCode: 400, error: 'password too short' };
    }

    if(!firstName) {
      throw { statusCode: 400, error: 'first name must have value' };
    }

    if(!lastName) {
      throw { statusCode: 400, error: 'last name must have value' };
    }

    const hash = await hashPassword(password);
    const result = await db.query(`INSERT INTO Users (Email, PWD, FirstName, LastName) VALUES ('${username}', '${hash}', '${firstName}', '${lastName}')`);
    return {
      id: result.insertId
    }

  } catch(err) {
    return err;
  }
    

}

module.exports = register;