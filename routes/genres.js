const {
  Genre,
  validate
} = require('../models/genres.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// GET request:
router.get('/', async (req, res) => {
  const genres = await Genre
    .find()
    .sort({
      name: 1
    });
  res.send(genres);
});

// GET requests for single genres:
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

// POST requests:
router.post('/', async (req, res) => {
  // Validate:
  const {
    error
  } = validate(req.body);
  // If invalid, return 400 - BAD request.
  if (error) return res.status(400).send(result.error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();

  res.send(genre);
});

// PUT requests:
router.put('/:id', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre does not exist.');

  // Return the same genre:
  res.send(genre);
});

module.exports = router;
