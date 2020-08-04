import json
from plaid import Client

def handler(event, context):
  
  client = Client(
    client_id='5f1f2d21f70dde0011538a32',
    secret='9e0e1c142475c5710f1fda7c0f88c6',
    environment='sandbox',
    api_version='2019-05-29'  # Specify API version
  )

  client_user_id = 'huncho'

  link = client.LinkToken.create({
    'user': {
      'client_user_id': client_user_id,
    },
    'products': ["transactions"],
    'client_name': "My App",
    'country_codes': ['US'],
    'language': 'en'
    "headers": {
      "Content-Type": 'applications/json',
      'Access-Control-Allow-Origin': "*"
    }

  })
  

  response = {
    'statusCode': 200,
    'body': json.dumps(link),
    "headers": {
      "Content-Type": 'applications/json',
      'Access-Control-Allow-Origin': "*"
    }
  }

  return response