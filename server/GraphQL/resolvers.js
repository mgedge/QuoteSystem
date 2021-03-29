const User = require('../models/users');

module.exports = {
    users: async function() {
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

    getUserRoleByID: async function({_id}) {
        const user = await User.findById(_id);

        if(!user) {
            throw new error("User not found");
        }

        user._id = _id;
        return {
            ...user._doc,
            _id: user._id.toString(),
        };
    },
}