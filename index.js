const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// global environment variables 
// require('dotenv').config();

// create server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// set up mongo database
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// route biome and donation backend requests
const biomeRouter = require('./app/routes/biome');
const donationRouter = require('./app/routes/donation');
const tokenRouter = require('./app/routes/token');
// use the routers for these endpoints
app.use('/api', tokenRouter);
app.use('/api/biome', biomeRouter);
app.use('/api/donation', donationRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/public')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

// if no route found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});