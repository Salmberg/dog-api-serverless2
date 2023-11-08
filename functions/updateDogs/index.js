const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const db = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {

    const { dogId } = event.pathParameters;
    const { age } = JSON.parse(event.body);

    try {
        await db.update({
            TableName: 'dogs-db',
            Key: { id: dogId },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set age = :age',
            ExpressionAttributeValues: {
                ':age': age
            }
        }).promise();

        return sendResponse(200, {success: true});

    }catch(error){
        return sendResponse(500, {success: false, message : 'There was an error updating the dog'});
    }         
}