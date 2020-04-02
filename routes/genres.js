
const express = require('express');
const router = express.Router();
const Joi = require('joi'); //Required for input validation.

const genres = [{
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Drama'
  },
  {
    id: 3,
    name: 'Horror'
  },
  {
    id: 4,
    name: 'Fantasy'
  },
];

// GET request:
router.get('/', (req, res) => {
  res.send(genres);
});

// GET requests for single genres:
router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  if (genre) res.send(genre);

  else res.status(404).send('Cannot find the genre');
});

// POST requests:
router.post('/', (req, res) => {
  // Validate:
  const { error } = validateGenre(req.body);

  // If invalid, return 400 - BAD request.
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

// PUT requests:
router.put('/:id', (req, res) => {

  // Look up for the genre
  // If it doesn't exist then return a status of 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Cannot find the given genre.');

  // Validate:
  const { error } = validateGenre(req.body);

  // If invalid, return 400 - BAD request.
  if (error) return res.status(400).send(result.error.details[0].message);

  // Update the genres.
  genre.name = req.body.name;

  // Return the updated genre.
  res.send(genre);

});

router.delete('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre does not exist.');

  // Delete:
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // Return the same course:
  res.send(genre);
});

function validateGenre(genre) {
  const schema = { // The schema for input validation is defined.
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre.body, schema); // Validates the body of the request with the schema.
}

module.exports = router;
