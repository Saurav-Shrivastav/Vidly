const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi
      .string()
      .required()
      .min(5)
      .max(50),
    email: Joi
      .string()
      .required()
      .min(5)
      .max(255)
      .email(),
    phone: Joi
      .string()
      .requird()
      .min(5)
      .max(255)
  };

  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;