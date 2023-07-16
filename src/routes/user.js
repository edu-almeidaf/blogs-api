const route = require('express').Router();
const { userController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

route.get('/user', validateJWT, userController.findAll);
route.get('/user/:id', validateJWT, userController.findById);

module.exports = route;