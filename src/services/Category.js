const { Category } = require('../models');

const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};