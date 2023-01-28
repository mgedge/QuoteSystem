const dbConfig = require("../server/external.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql'
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Insert models here
db.Customer = require("./schemas/customers.js")(sequelize, Sequelize);
db.Part = require("./schemas/parts.js")(sequelize, Sequelize);

module.exports = db;