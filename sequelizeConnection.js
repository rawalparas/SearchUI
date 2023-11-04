const config = require('./config/config')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.development);

module.exports = {
    testDbConnection : async () => {
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
};