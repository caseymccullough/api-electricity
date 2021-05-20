const { model, Schema } = require('mongoose');
const loadSchema = new Schema({
    name: { type: String, unique: true, required: true },
    wattage: { type: Number, required: true },
    standbyWattage: {type: Number, default: 0},
    currentWattage: {type: Number, default: 0},
    dailyUseHours: {type: Number, default: 0},
    kilowattHours: {type: Number, default: 0},
    onOffData: {type: Array, default: []}

})

module.exports = model('Load', loadSchema)