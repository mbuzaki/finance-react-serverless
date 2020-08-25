import json
import boto3

class Transaction():
  # This object will pull out the items we want for 
  # analyses. For any future work, this can be modified
  # to hold the info we want
 
  def __init__(self, amt, date, name, merchant_name, category='unhandled'):
    self.amt = amt
    self.date = date
    self.name = name
    self.merchantName = merchant_name
    self.category = category
    
  def toJSON(self):
    return json.dumps(self, default=lambda x: x.__dict__, indent=2)

def handler(event, context):

  dynamodb = boto3.resource('dynamodb')
  dynamodb = dynamodb.Table('UserDB-dev')
  
  item = dynamodb.get_item(Key={'id': 'hunchoquavo'})
  item = item['Item']
  
  categories = item['categories']
  keywords = item['categoryKeywords']

  transactions = json.loads(event['body'])
  transactions = transactions['transactions']

  cleaned = []

  # Make a nested list for each existing category using list comprehension.
  # So sick..
  categorized = [[] for i in categories]

  for obj in transactions:
    amt = obj['amount']
    # date = obj['date']
    name = obj['name']
    merchant_name = obj['merchant_name']
    category = 'unhandled'
    
    date = obj['date'].split('-')
    date = '-'.join(date[1:])
    '''
    Iterates through keywords nested array. If the
    merchant name exists in any of the keyword sub-arrays,
    then use that index to grab the name of the category
    in the categories list. Also adds that Transaction
    object to a 2D list for each sorted Transaction 
    by category. Uses same indexing method.
    '''
    for i in range(len(categories)):
      keywordsList = keywords[i]
      if merchant_name in keywordsList:
        category = categories[i]
        t = Transaction(amt, date, name, merchant_name, category)
        categorized[i].append(t.toJSON())
        cleaned.append(t.toJSON()) 
        break
    '''
    Catches the unsorted transactions and adds its JSON 
    object to the 'cleaned' list
    '''
    if category == 'unhandled':
      t = Transaction(amt, date, name, merchant_name, category)
      cleaned.append(t.toJSON())
  
  msg = {
    'statusCode': 200,
    'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps({'cleaned' : cleaned,
                        'categories': categories,
                        'keywords': keywords,
                        'sortedTransactions': categorized})
  }

  return msg