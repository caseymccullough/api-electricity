const { model, Schema } = require('mongoose');

const loadSchema = new Schema({
    name: { type: String, required: true },
    wattage: { type: Number, required: true },
    standbyWattage: {type: Number, default: 0},
})

module.exports = model('Load', loadSchema)