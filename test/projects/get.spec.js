const { get } = require('../../helpers/project/crud');
const db = require('../../helpers/db');

afterAll(async () => {
  await db.disconnect();  
});

test('get projects', async () => {
  // get all projects
  let result = await get();
  expect(result).not.toBe(null);
  expect(result).toBeInstanceOf(Array);
  // get single project
  result = await get(1);
  expect(result).not.toBeInstanceOf(Array);
  expect(result).toHaveProperty('ProjectID');
  expect(result['ProjectID']).toBe(1);
  expect(result).toHaveProperty('ProjectTitle');
  expect(result).toHaveProperty('ProjectDesc');
});