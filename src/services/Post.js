const { BlogPost, PostCategory, Category, sequelize } = require('../models');

const createPost = async ({ id, title, content, categoryIds }) => {
  const isCategoryExists = await Category.findAll({ where: { id: categoryIds } });
  if (isCategoryExists.length !== categoryIds.length) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  }

  const data = { title, content, userId: id, published: new Date(), updated: new Date() };

  try {
    const operations = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(data, { transaction: t });
      await Promise.all(categoryIds.map((categoryId) =>
      PostCategory.create({ postId: newPost.dataValues.id, categoryId }, { transaction: t })));
      return newPost;
    });
    
    console.log(operations);
    const newPost = await BlogPost.findByPk(operations.id);
    return { status: 201, data: newPost };
  } catch (error) {
    return { status: 500, data: error };
  }
};

module.exports = {
  createPost,
};