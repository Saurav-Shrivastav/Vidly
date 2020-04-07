const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = { // The schema for input validation is defined.
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema); // Validates the body of the request with the schema.
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
