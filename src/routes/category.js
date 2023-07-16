const route = require('express').Router();
const { categoryController } = require('../controllers');
const validateJWTCategory = require('../middlewares/validateJWTCategory');
const validateNameCategory = require('../middlewares/validateCategory');

route.post(
  '/categories',
  validateNameCategory,
  validateJWTCategory,
  categoryController.createCategory,
);

module.exports = route;