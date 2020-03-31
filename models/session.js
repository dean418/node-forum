const {Schema, model} = require('mongoose');

const session = Schema({
    expires: {type: Date, required: true},
    session: {type: String, required: true}
});

module.exports = model('sessions', session);