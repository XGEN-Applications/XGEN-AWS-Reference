const { add, update, deleteProject, get } = require('../../helpers/project/crud');
const { query, disconnect} = require('../../helpers/db');
const { validProject } = require('../models');
 
let projectId = 0;
let updatedProject = {};

beforeAll(async () => {
  const result = await add(validProject);
  projectId = result.ProjectID;
  updatedProject = Object.assign(validProject, { ProjectID: projectId });
  updatedProject.ProjectTitle = 'updated';
});

afterAll(async () => {
  await query(`DELETE from Projects where ProjectID=${projectId}`);
  await disconnect();  
});

test('update project', async () => {
  await update(updatedProject);
  const result = await get(projectId);
  expect(result).toHaveProperty('ProjectID');
  expect(result).toHaveProperty('ProjectTitle');
  expect(result.ProjectTitle).toBe('updated');
});