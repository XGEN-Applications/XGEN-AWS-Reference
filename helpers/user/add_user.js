const bcrypt = require('bcrypt');
const { query } = require('../db');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const validEmail = (email) => {
  const emailRegEx = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
  return emailRegEx.test(email);
}

const findUserByEmail = async (email) => {
  const result = await query(`SELECT count(*) as count FROM Users WHERE Email='${email}'`);
  return result[0];
}

const register = async (user) => {

  try {

    const { username, password, firstName, lastName } = user;
    
    if(!validEmail(username)) {
      throw { statusCode: 400, error: 'invalid email'};
    }

    const existingUsers = await findUserByEmail(username);
    if(existingUsers.count > 0) {
      throw { statusCode: 409, error: 'email exists' };
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
    const result = await query(`INSERT INTO Users (Email, PWD, FirstName, LastName) VALUES ('${username}', '${hash}', '${firstName}', '${lastName}')`);
    return {
      id: result.insertId
    }

  } catch(err) {
    return err;
  }
    

}

module.exports = register;