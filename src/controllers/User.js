const { UserService } = require('../services');

const findAll = async (req, res) => {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await UserService.deleteUser(id);
  if (data === 'success') {
    return res.status(status).end();
  }
  return res.status(status).json(data);
};

module.exports = {
  findAll,
  findById,
  deleteUser,
};