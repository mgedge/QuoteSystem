/** This file defines a user schema from the users table in the database
 * 
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize('quote', 'Matt', 'Matt', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false

});

let userSchema = sequelize.define('User', {
    userID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING(35),
        unique: true,
        allowNull: false
    },
    userPassword: {
        type: Sequelize.STRING(35),
        allowNull: false
    }
});

module.exports = userSchema;

/*
module.exports = sequelize.define('Roles', {
    role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role_title: {
        type: Sequelize.STRING(35),
        allowNull: false
    }
});

module.exports = sequelize.define('User_roles', {
    user_role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: User,
            key: 'userID'
        }
    },
    role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
                references: {
            model: User,
            key: 'userID'
        }
    }
});



//const app = express();

/*const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')*/