const route = require('express').Router();
const { postController } = require('../controllers');
// const validateJWTCategory = require('../middlewares/validateJWTCategory');
const validateJWT = require('../middlewares/validateJWT');
const validateNewPost = require('../middlewares/validatePost');

route.post(
  '/post',
  validateNewPost,
  validateJWT,
  postController.createPost,
);

route.get('/post', validateJWT, postController.getPosts);
module.exports = route;