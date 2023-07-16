const route = require('express').Router();
const { loginController } = require('../controllers');

route.post('/login', loginController.login);
route.post('/user', loginController.signup);

module.exports = route;