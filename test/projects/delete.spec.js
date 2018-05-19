const { add, deleteProject, get } = require('../../helpers/project/crud');
const { query, disconnect} = require('../../helpers/db');
const { validProject } = require('../models');
 
let projectId = 0;

beforeAll(async () => {
  const result = await add(validProject);
  projectId = result.ProjectID;
});
afterAll(async () => {
  await disconnect();  
});

test('add project', async () => {
  let result = await deleteProject(projectId);
  expect(result).not.toBe(null);
  expect(result).toBe('success');
  result = await get(projectId);
  expect(result).toBeUndefined;
});