const getUser = require('../../helpers/get_user');
const register = require('../../helpers/add_user');
const login = require('../../helpers/verify_user');
const db = require('../../helpers/db');
const { validUser } = require('../models');
const { JWT_SECRET } = require('../../config/config');
const jwt = require('jsonwebtoken'); 

let id = 0;
beforeAll(async () => {
  await register(validUser);
  const { token } = await login(validUser);
  const decoded = jwt.verify(token, JWT_SECRET);
  id = decoded.id;
});

afterAll(() => {
  db.query(`DELETE FROM Users WHERE Email='test@example.com'`);
  db.disconnect()
});

test('get user data', async () => {
  const result = await getUser(id);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('UserID');
  expect(result).toHaveProperty('FirstName');
  expect(result).toHaveProperty('LastName');
  expect(result).toHaveProperty('Email');
});