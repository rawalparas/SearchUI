const books = require('../../../model/bookModel.js');
const messages = require('../../../helper/messages.js');

module.exports = {
    create: async (req, res) => {
        try {
            const createBook = await books.insertMany(req.body);

            console.log("Inserted data: ", createBook);
            return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
        } catch (e) {
            console.log("Unexpected Error: " + e.message);
            return res.status(500).send({ message: e.message });
        }
    }
};
