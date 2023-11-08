
const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const db = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {

    const { dogId } = event.pathParameters;


    try {
        await db.delete({
            TabelName: 'dogs-db',
            Key: { id: dogId }
        }).promise();

        return sendResponse(200, {success: true});

    } catch (error) {
        return sendResponse(500, {success: false, message : 'There was an error deleting the dog'});
    }

}