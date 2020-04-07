const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres.js');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength:70
  },
  genre: genreSchema,
  numberInStock:{
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}));

function validateMovie(movie){
  const schema = {
    title: Joi
      .string()
      .required()
      .min(3)
      .max(70),
    genreId: Joi
      .string()
      .required(),
    numberInStock: Joi
      .string()
      .required()
      .min(0),
    dailyRentalRate: Joi
      .string()
      .min(0)
      .required()
  }

  return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movie = Movie;
