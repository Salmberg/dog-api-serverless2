const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const db = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {

    const { dogId } = event.pathParameters;
    const updateAttributes = JSON.parse(event.body);

    const updateExpression = 'set ' + Object.keys(updateAttributes).map(attributeName => `${attributeName} = :${attributeName}`).join(', ');
    
    let expressionAttributeValues = Object.keys(updateAttributes).reduce(values, attributeName => {
        values[`:${attributeName}`] = updateAttributes[attributeName];
        return values;
    }, {});

    expressionAttributeValues = { ...expressionAttributeValues, ':dogId': dogId }
    
   
    try {
        await db.update({
            TableName: 'dogs-db',
            Key: { id: dogId },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: updateExpression,
            ConditionExpression: 'id = :dogId',
            ExpressionAttributeValues: expressionAttributeValues
        }).promise();

        return sendResponse(200, {success: true});

    }catch(error){
        return sendResponse(500, {success: false, message : 'There was an error updating the dog'});
    }         
}