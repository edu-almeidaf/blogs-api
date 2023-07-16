const route = require('express').Router();
const { loginController } = require('../controllers');

route.post('/login', loginController.login);

module.exports = route;