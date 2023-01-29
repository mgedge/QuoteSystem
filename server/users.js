/** This file defines a user schema from the users table in the database  */

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    image: { type: String, default: 'default' },
    roles: [
        { role_title: String, role_id: String }
    ]
})
module.exports = mongoose.model('user', userSchema, 'users')

// export const User = mongoose.model('User', {
//         _id: mongoose.Types.ObjectId,
//     username: {type: String, required: true},
//     password: {type: String, required: true},
//     firstname: {type: String, required: true},
//     lastname: {type: String, required: true},
//     image: {type: String, default: 'default'},
//     roles: [
//         {role_title: String, role_id: String}
//     ]
// })