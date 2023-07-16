const { verifyPayload } = require('../auth/authfunctions');
const { UserService } = require('../services');

const validateJWT = async (req, res, next) => {
  const bearerToken = req.header('authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const decoded = verifyPayload(token);
    const user = await UserService.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;