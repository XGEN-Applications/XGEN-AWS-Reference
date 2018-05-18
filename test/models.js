// users
const validUser = {
  username: 'test@example.com',
  password: 'coolpass',
  firstName: 'Valid',
  lastName: 'User'
}

const invalidEmail = {
  username: '_testexample.com',
	password: 'coolpass',
	firstName: 'Valid',
  lastName: 'User'
}

const invalidPassword = {
  username: 'test@example.com',
	password: 'sdasd'
}

const shortPassword = {
  username: 'test@example.com',
	password: 'sdad',
	firstName: 'Valid',
  lastName: 'User'
}


const invalidFirstName = {
  username: 'test@example.com',
  password: 'coolpass',
  lastName: 'User'
}

const invalidLastName = {
  username: 'test@example.com',
  password: 'coolpass',
  firstName: 'Valid',
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


module.exports = { 
	validUser, 
	invalidEmail, 
	invalidPassword, 
	invalidFirstName,
	invalidLastName,
	invalidToken, 
	validProject, 
	shortPassword 
};