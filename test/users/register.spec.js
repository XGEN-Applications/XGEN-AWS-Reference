const register = require('../../helpers/user/add_user');
const { query, disconnect } = require('../../helpers/db');
const { validUser, invalidFirstName, invalidLastName, invalidEmail, shortPassword } = require('../models');

afterEach(async () => await query(`DELETE FROM Users WHERE Email='${validUser.username}'`));

afterAll(async () => {
  await disconnect()
});

test('register valid user', async () => {
  const result = await register(validUser);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('id');
  expect(result.id).toBeGreaterThanOrEqual(1);
});

test('invalid email', async () => {
  const result = await register(invalidEmail);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('invalid email');
});

test('password too short', async () => {
  const result = await register(shortPassword);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('password too short');
});

test('first name must have value', async () => {
  const result = await register(invalidFirstName);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('first name must have value');
});

test('last name must have value', async () => {
  const result = await register(invalidLastName);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('last name must have value');
});

test('email exists', async () => {
  await register(validUser);
  const result = await register(validUser);
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('error');
  expect(result.error).toBe('email exists');
});