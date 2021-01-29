import boto3
import json
import ast

print('Loading function')
dynamo = boto3.resource('dynamodb')
table_from_arduino = dynamo.Table('mechatronics_from_arduino')


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }
    
def post_action(a, payload):
    print("post_action executed")
    payload = ast.literal_eval(payload)
    name = payload["name"]
    light = payload["light"]
    temp = payload["temperature"]
    pres = payload["pres"]
    ax = payload["ax"]
    ay = payload["ay"]
    az = payload["az"]
    air_pres = payload["air_pres"]
    
    response = table_from_arduino.update_item(
        Key={
            'username': name
        },
        UpdateExpression="set light=:l, temperature=:t, pressure=:p, ax=:x, ay=:y, az=:z, air_pres=:ap",
        ExpressionAttributeValues={
            ':l': light,
            ':t': temp,
            ':p':pres,
            ':x':ax,
            ':y':ay,
            ':z':az,
            ':ap':air_pres
        },
        ReturnValues="UPDATED_NEW"
    )
    return "ok"


def lambda_handler(event, context):
    '''Demonstrates a simple HTTP endpoint using API Gateway. You have full
    access to the request and response payload, including headers and
    status code.

    To scan a DynamoDB table, make a GET request with the TableName as a
    query string parameter. To put, update, or delete an item, make a POST,
    PUT, or DELETE request respectively, passing in the payload to the
    DynamoDB API as a JSON body.
    '''
    #print("Received event: " + json.dumps(event, indent=2))

    #operations = {
    #    'DELETE': lambda dynamo, x: dynamo.delete_item(**x),
    #    'GET': lambda dynamo, x: dynamo.scan(**x),
    #    'POST': lambda dynamo, x: dynamo.put_item(**x),
    #    'PUT': lambda dynamo, x: dynamo.update_item(**x),
    #}
    
    operations = {
        'DELETE': lambda dynamo, x: dynamo.delete_item(**x),
        'GET': lambda dynamo, x: dynamo.scan(**x),
        'POST': lambda a, payload: post_action(a, payload),
        'PUT': lambda dynamo, x: dynamo.update_item(**x),
    }

    operation = event['httpMethod']
    if operation in operations:
        payload = event['body']
        #return respond(None, operations[operation](dynamo, payload))
        a=3
        return respond(None, operations[operation](a, payload))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))

