const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};