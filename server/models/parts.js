const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Part = sequelize.define("part", {
        number: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING(50)
        },
        price: {
            type: Sequelize.FLOAT(8,2)
        },
        weight: {
            type: Sequelize.FLOAT(4,2)
        },
        pictureURL: {
            type: Sequelize.STRING(50)
        }
    })

    return Part;
};

