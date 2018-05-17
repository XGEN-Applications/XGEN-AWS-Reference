// users
const validUser = {
  username: 'test@example.com',
  password: 'coolpass',
  firstName: 'Valid',
  lastName: 'User'
}

const invalidEmail = {
  username: '_test@example.com',
  password: 'coolpass'
}

const invalidPassword = {
  username: 'test@example.com',
  password: 'sdasad'
}

const invalidToken = 'aaabbbcccdddeeefffggg';

// projects
const validProject = {
  paramObjectiveID: 1,
  paramProjectTitle: 'Test project title',
  paramProjectDesc: 'Description with more than a few words.',
  paramProjectStartDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
  paramProjectEndDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
  paramProjectStatusID: null,
  paramCreateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
  paramUpdateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
  paramCreateBy: 1, 
  paramUpdateBy: 1, 
  paramSortOrder: null, 
  paramOrgID: 1
}

module.exports = { validUser, invalidEmail, invalidPassword, invalidToken, validProject };