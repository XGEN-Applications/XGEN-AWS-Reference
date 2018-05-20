const getUser = require('../../helpers/user/get_user');
const register = require('../../helpers/user/add_user');
const login = require('../../helpers/user/verify_user');
const logout = require('../../helpers/user/logout');
const { query, disconnect } = require('../../helpers/db');
const { validUser } = require('../models');
const { JWT_SECRET } = require('../../config/config');
const jwt = require('jsonwebtoken'); 
const util = require('util');
const verifyAsync = util.promisify(jwt.verify);

let id = 0;
let token = '';
beforeAll(async () => {
  await register(validUser);
  const result = await login(validUser);
  token = result.token;
  const decoded = await verifyAsync(token, JWT_SECRET);
  id = decoded.id
});

afterAll(async () => {
  await logout(token);
  await query(`DELETE FROM Users WHERE Email='${validUser.username}'`);
  await disconnect();
});

test('get user data', async () => {
  const result = await getUser(id);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('UserID');
  expect(result).toHaveProperty('FirstName');
  expect(result).toHaveProperty('LastName');
  expect(result).toHaveProperty('Email');
});