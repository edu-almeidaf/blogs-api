const { UserService } = require('../services');

const findAll = async (req, res) => {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
};

module.exports = {
  findAll,
};