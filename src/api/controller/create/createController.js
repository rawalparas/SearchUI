const mongoose = require('mongoose');
const sequelize = require('sequelize');
const {languageModel, authorModel, bookModel, searchModel} = require('../create')
const messages = require("../../../helper/messages.js");
const { book } = require('../../../../models');   // this file is importing the model for postgres.


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
        console.log(bookData);

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
  },
  insertBooksv2: async (req, res) => {
    try {
      const bookData = req.body.book;

      const insertedBook = await book.create({name : bookData.name , author_id : bookData.author, language_id : bookData.language});
      if (!insertedBook) {
        return res.status(400).send(messages.BAD_REQUEST);
      }
      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (error) {
      console.error(error);
      if (error instanceof sequelize.ValidationError) {
        return res.status(400).send(error.message);
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