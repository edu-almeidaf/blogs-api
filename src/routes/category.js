const route = require('express').Router();
const { categoryController } = require('../controllers');
const validateJWTCategory = require('../middlewares/validateJWTCategory');
const validateJWT = require('../middlewares/validateJWT');
const validateNameCategory = require('../middlewares/validateCategory');

route.post(
  '/categories',
  validateNameCategory,
  validateJWTCategory,
  categoryController.createCategory,
);

route.get('/categories', validateJWT, categoryController.getAllCategories);

module.exports = route;