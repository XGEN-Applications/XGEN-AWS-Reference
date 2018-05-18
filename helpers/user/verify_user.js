
const { setSession, query } = require('../db');
const util = require('util'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

const verify = async (credentials) => {

  try {

    const { username, password } = credentials;
    
    if(!password) {
      throw 'invalid password';
    }

    const results = await query(`SELECT * FROM Users WHERE Email = '${username}'`);

    if(!results.length) {
      throw { statusCode: 401, error: 'invalid email' };
    }

    const user = results[0];
    const isValid = bcrypt.compareSync(password, user.PWD);

    if(!isValid) {
      throw { statusCode: 401, error: 'invalid password' };
    }

    const token = jwt.sign({ id: user.UserID }, JWT_SECRET);
    setSession(user.UserID, token);
    return { token };

  } catch(err) {
    return err;
  }

}

module.exports = verify;