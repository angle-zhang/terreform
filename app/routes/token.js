const router = require('express').Router();
const axios = require('axios');

// env variables
const apiKey = process.env.API_KEY;
const tokenUrl = process.env.TOKEN_URL;
const apiEmail = process.env.API_EMAIL;
const apiPass = process.env.API_PASS;
const testGatekey = process.env.TEST_GATE_KEY;
const prodGatekey = process.env.PROD_GATE_KEY;

// gives api tokens and key
router.route('/get_token').get( async (req, res) => {
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
      key: apiKey, // gives api key as well
      token: tokenjson.auth_response.access_token,
      test_gatekey: testGatekey,
      prod_gatekey: prodGatekey
    });
  });

  module.exports = router;

  