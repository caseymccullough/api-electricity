const { model, Schema } = require('mongoose');
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    zipcode: {type: Number, required: true},
    loads: {type: Array}
})

module.exports = model('User', userSchema)
