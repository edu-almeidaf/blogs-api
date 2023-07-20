const { BlogPost, PostCategory, Category, User, sequelize } = require('../models');

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
    
    const newPost = await BlogPost.findByPk(operations.id);
    return { status: 201, data: newPost };
  } catch (error) {
    return { status: 500, data: error };
  }
};

const getPosts = async () => BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: {
        attributes: { exclude: ['postId', 'categoryId'] },
      },
    },
  ],
});

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
      },
    ],
  });

  if (!post) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }

  return { status: 200, data: post };
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};