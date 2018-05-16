const getProjects = require('../../helpers/get_projects');
const register = require('../../helpers/add_user');
const db = require('../../helpers/db');

test('get projects', async () => {
  const result = await getProjects();
  expect(result).not.toBe(null);
  expect(result).toHaveProperty('PfojectID');
  expect(result).toHaveProperty('ProjectTitle');
  expect(result).toHaveProperty('ProjectDesc');
});