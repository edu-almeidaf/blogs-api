const { newUserSchema } = require('./schemas');

const validateNewUser = (data) => {
  const { error } = newUserSchema.validate(data);

  if (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  validateNewUser,
};