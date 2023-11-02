const { sendResponse } = require('../../responses/index');

var dogs = [
    { name: 'Fido', age: 2, breed: 'mutt' },
    { name: 'Sparky', age: 8, breed: 'dalmatian' },
    { name: 'Fifi', age: 4, breed: 'poodle' }, 
    { name: 'Yeller', age: 6, breed: 'lab' }
]

exports.handler = async (event, context) => {

return sendResponse(200, {dogs});
console.log('Det funkade!');


}