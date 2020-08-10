import json
def handler(event, context):

  msg = {
    'statusCode': 200,
    'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps('hello from lambda')
  }

  return msg