const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { 
            type: String,
            unique: true,
            required: true
         },
    password: {
            type: String,
            required: true
         },
    creationDate: {
            type: Date,
            default: Date.now,
            immutable: true
        },
    loads: {
        type: Array,
        ref: 'Load'
    }
})

module.exports = model('User', userSchema)
