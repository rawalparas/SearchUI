const mongoose = require('mongoose');
const authorModel = require("../../../model/authorModel.js");
const bookModel = require("../../../model/bookModel.js");
const languageModel = require("../../../model/languageModel.js");
const searchModel = require('../../../model/searchModel.js');
const messages = require("../../../helper/messages.js");

module.exports = { 
  insertBooks: async (req, res) => {
    try {
      const books = req.body;

      await Promise.all(books.map(async (book) => {
        const { name, author, language } = book;

        const [languageId, authorId] = await Promise.all([
          createIfNotExist(languageModel.model, { name: language }),
          createIfNotExist(authorModel.model, { name: author })
        ]);

        const bookData = await bookModel.model.create({
          name: name,
          authorId: authorId._id,
          languageId: languageId._id,
        });

        await Promise.all([
          createIfNotExist(searchModel, { name: bookData.name, type: bookModel.type, s_id: bookData._id }),
          createIfNotExist(searchModel, { name: authorId.name, type: authorModel.type, s_id: authorId._id }),
          createIfNotExist(searchModel, { name: languageId.name, type: languageModel.type, s_id: languageId._id })
        ]);
      }));

      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(err.message);
      }
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};

function createIfNotExist(model, query) {
  return new Promise((resolve, reject) => {
    model.findOne(query)
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          resolve(model.create(query));
        }
      })
      .catch((error) => {
        console.log("Error in findAndCreate" , error);
        throw error;
      });
  });
}