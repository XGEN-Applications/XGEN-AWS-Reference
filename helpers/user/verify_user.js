
const { setSession, query } = require('../db');
const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SESSION_TTL_SECONDS } = require('../../config/config');

const verify = async (credentials) => {


  const { username, password } = credentials;

  if (!password) {
    throw 'invalid password';
  }

  const results = await query(`SELECT * FROM Users WHERE Email = '${username}'`);

  if (!results.length) {
    throw { statusCode: 401, error: 'invalid email' };
  }

  const user = results[0];
  const isValid = bcrypt.compareSync(password, user.PWD);

  if (!isValid) {
    throw { statusCode: 401, error: 'invalid password' };
  }

  const token = jwt.sign({
    id: user.UserID,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  }, JWT_SECRET);
  setSession(user.UserID, token);
  return { token };

}

module.exports = verify;