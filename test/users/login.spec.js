const register = require('../../helpers/user/add_user');
const login = require('../../helpers/user/verify_user');
const db = require('../../helpers/db');
const { validUser, invalidEmail, invalidPassword } = require('../models');


beforeAll(async () => await register(validUser));
afterAll(async () => {
  await db.query(`DELETE FROM Users WHERE Email='test@example.com'`);
  await db.disconnect();  
});

test('success login', async () => {
  const result = await login(validUser);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('token');
});

test('invalid email', async () => {
  const result = await login(invalidEmail);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('invalid email');
});

test('invalid password', async () => {
  const result = await login(invalidPassword);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('invalid password');
});