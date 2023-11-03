const config = require('./config/config')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.development);

// console.log(sequelize);

module.exports = {
    testDbConnection : async () => {
        console.log("Hello");
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
};