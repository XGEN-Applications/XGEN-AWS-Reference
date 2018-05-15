const register = require('../helpers/add_user');
const login = require('../helpers/verify_user');
const db = require('../helpers/db');

const validUser = {
  username: 'test@example.com',
  password: 'coolpass'
}

const invalidEmail = {
  username: '_test@example.com',
  password: 'coolpass'
}

const invalidPassword = {
  username: 'test@example.com',
  password: 'sdasad'
}

beforeAll(() => register(validUser));
afterAll(() => {
  db.query(`DELETE FROM Users WHERE Email='test@example.com'`);
  db.disconnect()
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