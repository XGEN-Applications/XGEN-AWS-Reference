const { add, deleteProject, get } = require('../../helpers/project/crud');
const { search } = require('../../helpers/project/search');

const { query, disconnect} = require('../../helpers/db');
const { validProject } = require('../models');
 
let projectId = 0;

beforeAll(async () => {
  const result = await add(validProject);
  projectId = result.ProjectID;
});

afterAll(async () => {
  await query(`DELETE from Projects where ProjectID=${projectId}`);
  await disconnect();  
});

test('update project', async () => {
  let result = await search({ ProjectID: projectId });
  expect(result).toBeInstanceOf(Array);
  expect(result.length).toBeGreaterThanOrEqual(1);
  result = result[0];
  expect(result).toHaveProperty('ProjectID');
  expect(result).toHaveProperty('ProjectTitle');
  expect(result).toHaveProperty('ProjectDesc');
  expect(result.ProjectID).toBe(projectId);
  expect(result.ProjectTitle).toBe('Test project title');
  expect(result.ProjectDesc).toBe('Description with more than a few words.');
});