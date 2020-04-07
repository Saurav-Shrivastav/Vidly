const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Number,
    required: true,
    maxlength: 10
  }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
  const schema = {
    name: Joi.string().min(3).max(10).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().required().max(10)
  }
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
