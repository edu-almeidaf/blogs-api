const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};