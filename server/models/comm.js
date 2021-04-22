/** This file defines a commission schema from the commission table in the database  */

const mongoose = require('mongoose')

const commSchema = new mongoose.Schema({
    username: {type: String, required: true},
    totalCommissionAmt: {type: String, required: true},
    totalNumComms: {type: String, required: true}
})
module.exports = mongoose.model('Comm', commSchema, 'comms')