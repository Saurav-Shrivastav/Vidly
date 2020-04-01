const Joi = require('joi'); //Required for input validation.
const express = require('express'); // Instantiating the express object that returns a function.
const app = express();

app.use(express.json()); // To enable parsing of json objects to use the req.body.name in the post and put requests.

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

app.get('/', (req, res) => {
  res.send('Head over to /api/courses to get the genres.');
});

// GET request:
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// GET requests for single genres:
app.get('/api/genres/:id', (req, res) => {

  const genre = genres.find(c => c.id === parseInt(req.params.id)); // Finding the given genre, by the req.params.id

  if (genre) res.send(genre); // If the genre exists then it is sent via the response.

  else res.status(404).send('Cannot find the genre'); // Else a status of 404 with a message is sent back.

});

// POST requests:
app.post('/api/genres', (req, res) => {
  // Validate:
  const {
    error
  } = validateGenre(req.body);

  // If invalid, return 400 - BAD request.
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }; // The object that needs to be posted.

  genres.push(genre);
  res.send(genre);
});

// PUT requests:
app.put('/api/genres/:id', (req, res) => {

  // Look up for the genre
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  // If it doesn't exist then return a status of 404
  if (!genre) return res.status(404).send('Cannot find the given genre.');

  // Validate:
  const {
    error
  } = validateGenre(req.body);

  // If invalid, return 400 - BAD request.
  if (error) return res.status(400).send(result.error.details[0].message);

  // Update the genres.
  genre.name = req.body.name;

  // Return the updated genre.
  res.send(genre);

});

app.delete('/api/genres/:id', (req, res) => {

  // Look up the course:
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  // If not existing, return 404:
  if (!genre) return res.status(404).send('The genre doesn\'t exist.');

  // Delete:
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // Return the same course:
  res.send(genre);

});

// PORT:
const port = process.env.PORT || 3000; // the global object 'process' has the env property which has a PORT property which gives the available ports on the server at that time else port-3000 is assigned.
app.listen(port, () => console.log(`Listening on port ${port}....`)); // It called when the application starts listening on a particular port.

function validateGenre(genre) {

  const schema = { // The schema for input validation is defined.
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre.body, schema); // Validates the body of the request with the schema.
}
