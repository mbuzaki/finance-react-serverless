/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var plaid = require('plaid');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  req.header("Access-Control-Allow-Origin", "*")
  req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const client = new plaid.Client({
  clientID: '5f1f2d21f70dde0011538a32',
  secret: '9e0e1c142475c5710f1fda7c0f88c6',
  env: plaid.environments.sandbox
});

// Accept the public_token sent from Link
app.post('/accessToken', async function(request, res, next) {
  const public_token = request.body.public_token;
  //const public_token = 'token'
  // client.exchangePublicToken(public_token, async function(error, exchangeResponse) {
  //   if (error != null) {
  //     console.log('Could not exchange public_token!' + '\n' + error);
  //     return exchangeResponse.json({error: msg});
  //   }

  //   // Store the access_token and item_id in your database
  //   ACCESS_TOKEN = exchangeResponse.access_token;
  //   ITEM_ID = exchangeResponse.item_id;

  //   console.log('Access Token: ' + ACCESS_TOKEN);
  //   console.log('Item ID: ' + ITEM_ID);
  // });
  res.json({body: public_token});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
