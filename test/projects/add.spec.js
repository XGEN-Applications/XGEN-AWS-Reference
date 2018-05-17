const { add } = require('../../helpers/project/crud');
const db = require('../../helpers/db');
const { validProject } = require('../models');
 
let projectId = 0;
afterAll(async () => {
  await db.query(`DELETE from Projects where ProjectID=${projectId}`);
  await db.disconnect();  
});

test('add project', async () => {
  const result = await add(validProject);
  expect(result).toHaveProperty('ProjectID');
  projectId = result.ProjectID;
  expect(projectId).not.toBe(null);
  expect(projectId).toBeGreaterThan(0);
});