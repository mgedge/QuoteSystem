/***************************************************
 * resolvers.js
 *
 * This file defines GraphQL calls.
 *
 **************************************************/
const User = require('./users');

module.exports = {
    // GET GraphQL call for ALL users
    users: async function () {
        const users = await User.find();
        return {
            users: users.map((q) => {
                return {
                    ...q._doc,
                    _id: q._id.toString(),
                }
            })
        }
    },

    // GET GraphQL call for all users with the specified ID
    getUserRoleByID: async function ({ _id }) {
        const user = await User.findById(_id);

        if (!user) {
            throw new error("User not found");
        }

        user._id = _id;
        return {
            ...user._doc,
            _id: user._id.toString(),
        };
    },
}
