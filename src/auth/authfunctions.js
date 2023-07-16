const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = { algorithm: 'HS256', expiresIn: '15m' };

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyPayload = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyPayload,
};