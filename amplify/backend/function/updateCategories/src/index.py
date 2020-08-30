import json
import boto3

def handler(event, context):
  
  eventString = event['body']
  jsonObj = json.loads(eventString)
  categories = jsonObj['categories']
  kw = jsonObj['kw']
  
  
  dynamodb = boto3.resource('dynamodb')
  dynamodb = dynamodb.Table('UserDB-dev')

  dynamodb.update_item(Key= { 'id' : 'hunchoquavo' },
                       UpdateExpression= 'set categories = :categories',
                       ExpressionAttributeValues= {
                       ':categories' : categories
                        })
                        
  dynamodb.update_item(Key= { 'id' : 'hunchoquavo' },
                       UpdateExpression= 'set categoryKeywords = :kw',
                       ExpressionAttributeValues= {
                       ':kw' : kw
                        })

  msg = {
    'statusCode': 200,
    'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps({'msg': 'sucessfully updated db table',
                        'categories': categories,
                        'kw': kw})
  }

  return msg