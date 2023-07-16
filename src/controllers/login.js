const { UserService } = require('../services');
const { generateToken } = require('../auth/authfunctions');

const verifyBodyFields = (email, password) => email && password;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!verifyBodyFields(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const { password: _password, ...payload } = user.dataValues;

    const token = generateToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected error', error: error.message });
  }
};

module.exports = {
  login,
};