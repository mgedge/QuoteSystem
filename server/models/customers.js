const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(50)
        },
        city: {
            type: Sequelize.STRING(50)
        },
        street: {
            type: Sequelize.STRING(50)
        },
        contact: {
            type: Sequelize.STRING(50)
        }
    })

    return Customer;
};

