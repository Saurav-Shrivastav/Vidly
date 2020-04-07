
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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
    required: true
  },
  phone: {
    type: Number,
    required: true,
    maxlength: 10
  }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
  const customers = await Customer
    .find()
    .sort({ name:1 });
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, {
    new: true
  });
  if(!customer) return res.status(404).send("The customer with the given ID was not found.");
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if(!customer) return res.status(404).send("The customer with the given ID was not found.");
  res.send(customer);
});

function validateCustomer(customer){
  const schema = {
    name: Joi.string().max(10).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.number().required()
  }
  return Joi.validate(customer, schema);
}

module.exports = router;
