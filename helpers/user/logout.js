'use strict';

const util = require('util');
const { getSession, clearSession, query } = require('../db');
const jwt = require('jsonwebtoken');
const verifyAsync = util.promisify(jwt.verify);
const { JWT_SECRET } = require('../../config/config');

const logout = async (token) => {

  const decoded = await verifyAsync(token, JWT_SECRET);
  const { statusCode, error} = await getSession(decoded.id, token);
  if(error) throw { statusCode, error};
  await clearSession(decoded.id);
  return 'success';

};

module.exports = logout;