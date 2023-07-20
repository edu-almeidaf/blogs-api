const { User } = require('../models');
const { validateNewUser } = require('./validations/userValidations');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserByEmail = (email) => User.findOne({
  where: { email },
});

const getUserById = (id) => User.findByPk(id, {
  attributes: { exclude: ['password'] },
});

const createUser = async (data) => {
  const error = validateNewUser(data);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const isEmailRegistered = await getUserByEmail(data.email);
  if (isEmailRegistered) {
    return { status: 409, data: { message: 'User already registered' } };
  }

  const newUser = User.create(data);

  return newUser;
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
};