import json

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

  cleaned = []
  for key, value in event.items():
    amt = value['amount']
    date = value['date']
    name = value['name']
    merchant_name = value['merchant_name']
    t = Transaction(amt, date, name, merchant_name)
    cleaned.append(t.toJSON())

  msg = {
    'statusCode': 200,
    'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps({'cleaned' : cleaned})
  }

  return msg