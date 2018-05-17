const register = require('../../helpers/user/add_user');
const login = require('../../helpers/user/verify_user');
const logout = require('../../helpers/user/logout');
const db = require('../../helpers/db');
const { validUser, invalidToken } = require('../models');
let validToken = '';

beforeAll(async () => {
    const registerResult = await register(validUser);
    const response = await login(validUser);
    validToken = response.token;
});

afterAll(() => {
  db.query(`DELETE FROM Users WHERE Email='test@example.com'`);
  db.disconnect()
});

test('success logout', async () => {
  const result = await logout(validToken);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('token');
});

test('invalid token', async () => {
  const result = await logout(invalidToken);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('invalid token');
});

test('no token', async () => {
  const result = await logout('');
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('invalid token');
});