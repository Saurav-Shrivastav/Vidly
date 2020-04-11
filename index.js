const error = require('../middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js');
const movies = require('./routes/movies.js');
const rentals = require('./routes/rentals.js');
const users = require('./routes/users.js');
const auth = require('./routes/auth.js');
const express = require('express'); // Instantiating the express object that returns a function.
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/Vidly', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to the db....'))
  .catch(err => console.log('Could not conect to the database', err));

app.use(express.json()); // To enable parsing of json objects to use the req.body.name in the post and put requests.
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

app.get('/', (req, res) => {
  res.send('Head over to /api/courses to get the genres.');
});

// PORT:
const port = process.env.PORT || 3000; // the global object 'process' has the env property which has a PORT property which gives the available ports on the server at that time else port-3000 is assigned.
app.listen(port, () => console.log(`Listening on port ${port}....`)); // It called when the application starts listening on a particular port.
