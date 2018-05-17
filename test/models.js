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
	ProjectID: 6,
  ObjectiveID: 1,
	ProjectTitle: 'Test project title',
	ProjectDesc: 'Description with more than a few words.',
	ProjectStartDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
	ProjectEndDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
	ProjectStatusID: null,
	CreateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
	UpdateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
	CreateBy: 1,
	UpdateBy: 1,
	SortOrder: null,
	OrgID: 1
}


module.exports = { validUser, invalidEmail, invalidPassword, invalidToken, validProject };