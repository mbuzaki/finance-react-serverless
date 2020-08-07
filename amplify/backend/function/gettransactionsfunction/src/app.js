/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	STORAGE_USERDB_ARN
	STORAGE_USERDB_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var plaid = require('plaid');
var moment = require('moment');

AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

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

app.get('/transactions', function(req, res) {
  var dbresponse = 'never changed';
  var params = {
    TableName: 'UserDB-dev',
    Key: {
      id: 'hunchoquavo'
    }
  };

  let startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  dynamodb.get(params, (err, data) => {
    if(err) {dbresponse = err}
    else {
      accessToken = data.Item.accessToken;
      client.getTransactions(accessToken, startDate, endDate, {
        count: 250,
        offset: 0
      }, 
      function(err, transactionsResponse){
        res.json({msg: transactionsResponse})
      });
    }
  });
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
