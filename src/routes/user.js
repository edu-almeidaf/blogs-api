const route = require('express').Router();
const { userController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

route.get('/user', validateJWT, userController.findAll);

module.exports = route;