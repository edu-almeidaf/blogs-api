const { User, sequelize } = require('../models');
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

const deleteUser = async (id) => {
  try {
    await sequelize.transaction(async (t) => {
      await User.destroy({ where: { id }, transaction: t });
    });
    
    return { status: 204, data: 'success' };
  } catch (error) {
    return { status: 500, data: error };
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  deleteUser,
};