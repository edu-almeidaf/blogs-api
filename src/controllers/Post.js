const { postService } = require('../services');

const createPost = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await postService.createPost({ id, ...req.body });
  return res.status(status).json(data);
};

const getPosts = async (_req, res) => {
  const posts = await postService.getPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getPostById(id);
  return res.status(status).json(data);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};