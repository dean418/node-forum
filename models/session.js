const {Schema, model} = require('mongoose');

let session = Schema({
    expires: {type: Date, required: true},
    session: {type: String, required: true}
});

module.exports = model('sessions', session);