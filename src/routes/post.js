const route = require('express').Router();
const { postController } = require('../controllers');
// const validateJWTCategory = require('../middlewares/validateJWTCategory');
const validateJWT = require('../middlewares/validateJWT');
const validateNewPost = require('../middlewares/validatePost');
const validateUpdatePost = require('../middlewares/validateUpdatePost');

route.post(
  '/post',
  validateNewPost,
  validateJWT,
  postController.createPost,
);

route.get('/post', validateJWT, postController.getPosts);
route.get('/post/search', validateJWT, postController.getPostsByQuery);
route.get('/post/:id', validateJWT, postController.getPostById);
route.put(
  '/post/:id',
  validateUpdatePost,
  validateJWT,
  postController.updatePost,
);
route.delete(
  '/post/:id',
  validateJWT,
  postController.deletePost,
);
module.exports = route;