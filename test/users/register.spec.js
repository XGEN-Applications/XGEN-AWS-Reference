const register = require('../../helpers/user/add_user');
const db = require('../../helpers/db');

const validUser = {
  username: 'test@example.com',
  password: 'coolpass',
  firstName: 'Valid',
  lastName: 'User'
}

const invalidEmail = {
  username: 'test  example.com',
  password: 'coolpass',
  firstName: 'Valid',
  lastName: 'User'
}

const invalidPassword = {
  username: 'test@example.com',
  password: 'cool',
  firstName: 'Valid',
  lastName: 'User'
}

const invalidFirstName = {
  username: 'test@example.com',
  password: 'coolpass',
  lastName: 'User'
}

const invalidLastName = {
  username: 'test@example.com',
  password: 'coolpass',
  firstName: 'Valid',
}

afterAll(async () => await db.disconnect());

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
  const result = await register(invalidPassword);
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