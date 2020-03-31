const {Schema, model} = require('mongoose');

const user = Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    createdOn: {type: Date, required: true, unique: false},
    upVotes: {type: Number, required: false, unique: false}
});

user.statics.findByLogin = (login) => {
    let user = await this.findOne({userName: login});
    
    if (!user) {
        user = await this.findOne({email: login});
    }
    
    return user;
}

module.exports = model('users', user);