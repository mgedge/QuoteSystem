const express = require('express');
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

module.exports = sequelize.define('User', {
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



//const app = express();

/*const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')*/