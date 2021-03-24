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
    }
}