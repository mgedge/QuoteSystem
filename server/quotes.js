/** This file defines a quote schema from the quotes table in the database  */

const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quoteID: {type: Number, required: true},
    username: {type: String, required: true},
    customer: {type: String, required: true},
    email: {type: String, required: true},
    items: [
        {name: String, count: Number}
    ],
    status: {type: String, required: true},
    discount: {type: String, required: true}
})
module.exports = mongoose.model('quote', quoteSchema, 'quotes')