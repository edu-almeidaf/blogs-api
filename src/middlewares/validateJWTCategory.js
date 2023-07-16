const { verifyPayload } = require('../auth/authfunctions');
const { UserService } = require('../services');

const validateJWTCategory = async (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

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

module.exports = validateJWTCategory;