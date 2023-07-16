const { postService } = require('../services');

const createPost = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await postService.createPost({ id, ...req.body });
  return res.status(status).json(data);
};

module.exports = {
  createPost,
};