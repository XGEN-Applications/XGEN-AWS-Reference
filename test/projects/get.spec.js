const { get } = require('../../helpers/project/crud');
const register = require('../../helpers/user/add_user');
const db = require('../../helpers/db');

afterAll(async () => {
  await db.disconnect();  
});

test('get projects', async () => {
  const result = await get();
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('ProjectID');
  expect(result).toHaveProperty('ProjectTitle');
  expect(result).toHaveProperty('ProjectDesc');
});