/** This file defines a commission schema from the commission table in the database  */

const mongoose = require('mongoose')

const commSchema = new mongoose.Schema({
    username: {type: String, required: true},
    totalCommissionAmt: {type: Number, required: true},
    totalNumCommissions: {type: Number, required: true}
})
module.exports = mongoose.model('commission', commSchema, 'commission')