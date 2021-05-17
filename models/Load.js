const { model, Schema } = require('mongoose');
const loadSchema = new Schema({
    name: { type: String, unique: true, required: true },
    wattage: { type: Number, required: true },
    standbyWattage: {type: Number, default: 0},
    dailyUseHours: {type: Number},
    dailyUseMinutes: {type: Number}
})

module.exports = model('Load', loadSchema)