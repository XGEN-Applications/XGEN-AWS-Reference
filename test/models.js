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

module.exports = { validUser, invalidEmail, invalidPassword, invalidToken };