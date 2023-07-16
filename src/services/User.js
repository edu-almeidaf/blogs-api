const { User } = require('../models');
const { validateNewUser } = require('./validations/userValidations');

const getUserByEmail = (email) => User.findOne({
  where: { email },
});

const createUser = async (data) => {
  const error = validateNewUser(data);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const isEmailRegistered = await getUserByEmail(data.email);
  console.log(isEmailRegistered);
  if (isEmailRegistered) {
    return { status: 409, data: { message: 'User already registered' } };
  }

  const newUser = User.create(data);

  return newUser;
};

module.exports = {
  getUserByEmail,
  createUser,
};