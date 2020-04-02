
const genres = require('./routes/genres.js')
const express = require('express'); // Instantiating the express object that returns a function.
const app = express();

app.use(express.json()); // To enable parsing of json objects to use the req.body.name in the post and put requests.
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.send('Head over to /api/courses to get the genres.');
});

// PORT:
const port = process.env.PORT || 3000; // the global object 'process' has the env property which has a PORT property which gives the available ports on the server at that time else port-3000 is assigned.
app.listen(port, () => console.log(`Listening on port ${port}....`)); // It called when the application starts listening on a particular port.
