const axios = require('axios');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// global environment variables
// require('dotenv').config();

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
const biomeRouter = require('./routes/biome');
const donationRouter = require('./routes/donation');

// use the routers for these endpoints
app.use('/api/biome', biomeRouter);
app.use('/api/donation', donationRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// get token using API key
const apiKey = process.env.API_KEY;
const tokenUrl = process.env.TOKEN_URL;
const apiEmail = process.env.API_EMAIL;
const apiPass = process.env.API_PASS;
const testGatekey = process.env.TEST_GATE_KEY;
const prodGatekey = process.env.PROD_GATE_KEY;

app.get('/api/get_token', async (req, res) => {
  const result = await axios.post(tokenUrl, {
    auth_request: {
      user: {
        email: apiEmail,
        password: apiPass
      },
      api_key: apiKey
    }
  });
  const tokenjson = await result.data;
  res.json({
    token: tokenjson.auth_response.access_token,
    test_gatekey: testGatekey,
    prod_gatekey: prodGatekey
  });
});

