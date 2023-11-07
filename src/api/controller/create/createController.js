const mongoose = require('mongoose');
const sequelize = require('sequelize');
const models = require('../../../model');
const messages = require("../../../helper/messages.js");
const pgBook = require('../../../../models');

module.exports = {
  insertBooks: async (req, res) => {
    try {
      const books = req.body;

      await Promise.all(books.map(async (book) => {
        const { name, author, language } = book;

        const [languageId, authorId] = await Promise.all([
          createIfNotExist(models.language, { name: language }),
          createIfNotExist(models.author, { name: author })
        ]);

        const bookData = await models.book.create({
          name: name,
          authorId: authorId._id,
          languageId: languageId._id,
        });
        console.log(bookData);

        await Promise.all([
          createIfNotExist(models.search, { name: bookData.name, type: bookModel.type, s_id: bookData._id }),
          createIfNotExist(models.search, { name: authorId.name, type: authorModel.type, s_id: authorId._id }),
          createIfNotExist(models.search, { name: languageId.name, type: languageModel.type, s_id: languageId._id })
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
      const {name , author, language} = req.body;

      const [insertedLanguage , insertedAuthor] = await Promise.all([
        createIfNotExist(pgBook.language, {name : language}),
        createIfNotExist(pgBook.author, {name : author})
      ]);

      const insertBook = await pgBook.book.create({
        name : name,
        authorId : insertedAuthor.id,
        languageId : insertedLanguage.id
      });

      if (!insertBook) {
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
        console.log("Error in findAndCreate", error);
        throw error;
      });
  });
}