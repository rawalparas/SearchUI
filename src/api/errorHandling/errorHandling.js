const messages = require('../../helper/messages.js');

const errorHandler = (error , req , res , next) => {
    return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
}

module.exports = errorHandler;