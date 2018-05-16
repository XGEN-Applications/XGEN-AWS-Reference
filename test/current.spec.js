const getUser = require('../helpers/get_user');
const register = require('../helpers/add_user');
const db = require('../helpers/db');
const { validUser } = require('./models');

beforeAll(async () => {
  await register(validUser);
});

afterAll(() => {
  db.query(`DELETE FROM Users WHERE Email='test@example.com'`);
  db.disconnect()
});

test('get user data', async () => {
  const result = await getUser();
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('UserID');
  expect(result).toHaveProperty('FirstName');
  expect(result).toHaveProperty('LastName');
  expect(result).toHaveProperty('Email');
});