/** This file defines a item schema from the items table in the database  */

const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
})
module.exports = mongoose.model('item', itemSchema, 'items')