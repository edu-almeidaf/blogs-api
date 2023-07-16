const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  })

  PostCategoryTable.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategoryTable,
    });

    Category.belongsToMany(BlogPost, {
      as: 'blog_posts',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategoryTable,
    });
  }

  return PostCategoryTable;
}

module.exports = PostCategorySchema;