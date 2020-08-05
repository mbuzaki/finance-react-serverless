var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var plaid = require("plaid")

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


const client = new plaid.Client({
  clientID: '5f1f2d21f70dde0011538a32',
  secret: '9e0e1c142475c5710f1fda7c0f88c6',
  env: plaid.environments.sandbox
});

app.post('/plaidLinkToken', async function(request, res, next) {
  // Grab the client_user_id by searching for the current user in your database

  const clientUserId = 'huncho';

  // Create the link_token with all of your configurations
  client.createLinkToken({
    user: {
      client_user_id: clientUserId,
    },
    client_name: 'My App',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
  }, function(error, linkTokenResponse) {
    // Pass the result to your client-side app to initialize Link
    res.json({ link_token: linkTokenResponse.link_token });
  });
});

//Exchanging public token from link for access token
app.post('/plaidAccessToken', function(request, response, next) {
  const public_token = request.body.public_token;
  client.exchangePublicToken(public_token, function(error, response) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + error);
      return response.json({error: msg});
    }

    // Store the access_token and item_id in your database
    ACCESS_TOKEN = response.access_token;
    ITEM_ID = response.item_id;

    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({'error': false});
  });
});

app.get('/plaidTransactions', function(request, response) {
  const accessToken = request.body.access_token;
  client.getTransactions(accessToken, '2020-07-01', '2018-08-01', {
    count: 250,
    offset: 0,
  }, (err, result) => {
    // Handle err
    response.json({transactions: result.transactions});
  });
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
