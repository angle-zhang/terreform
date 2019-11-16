const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// global environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// set up mongo database
const uri = process.env.ATLAS_URI;
const options =  { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  dbName: "terre"
};

mongoose.connect(uri, options);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// route biome and donation backend requests
const biomeRouter = require('./routes/biome');
const donationRouter = require('./routes/donation');

// use the routers for these endpoints
app.use('/api/biome', biomeRouter);
app.use('/api/donation', donationRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

