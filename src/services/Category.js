const { Category } = require('../models');

const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

module.exports = {
  createCategory,
};