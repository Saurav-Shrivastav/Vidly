const express = require('express');   // Instantiating the express object that returns a function.
const app = express();

app.use(express.json());    // To enable parsing of json objects to use the req.body.name in the post and put requests.

const genres = [
  {
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
  res.send('Head over to /api/courses to get the genres.')
});

// GET request:
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// GET requests for single genres:
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));   // Finding the given genre, by the req.params.id
  if(genre) res.send(genre);      // If the genre exists then it is sent via the response.
  else res.status(404).send('Cannot find the genre');   // Else a status of 404 with a message is sent back.
});

// POST requests:
app.post('/api/genres', (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

// PORT:
const port = process.env.PORT || 3000;  // the global object 'process' has the env property which has a PORT property which gives the available ports on the server at that time else port-3000 is assigned.
app.listen(port, () => console.log(`Listening on port ${port}....`));
// It called when the application starts listening on a particular port.
