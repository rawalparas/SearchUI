const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const book = require("../../../model/bookModel.js");
const language = require("../../../model/languageModel.js");
const search = require('../../../model/searchModel.js');

module.exports = {
  insertBooks: async (req, res) => {
    try {
      const { name: bookName, author: authorName, language: languageName } = req.body;

      let languageId = await language.findOne({ name: languageName });
      if (!languageId || languageId.length == 0) {
        languageId = await language.create({ name: languageName });
      }

      let authorId = await author.findOne({ name: authorName });
      if (!authorId || authorId.length == 0) {
        authorId = await author.create({ name: authorName });
      }
      bookData = await book.create({
        name: bookName,
        authorId: authorId._id,
        languageId: languageId._id,
      });

      let searchBook = await findData(bookData._id);
      if (!searchBook) {
        searchBook = await createData(bookData.name, bookData._id)
      }

      let searchAuthor = await findData(authorId._id);
      if (!searchAuthor) {
        searchAuthor = await createData(authorId.name, authorId._id);
      }

      let searchLanguage = await findData(languageId._id);
      if (!searchLanguage) {
        searchLanguage = await createData(languageId.name, languageId._id)
      }
      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
};

async function findData(Object_id) {
  try {
    return await search.findOne({
      s_id: Object_id
    });
  } catch (error) {
    console.error("Error in findData:", error);
  }
}

async function createData(name, Object_id) {
  try {
    return await search.create({
      name,
      s_id: Object_id
    })
  } catch (error) {
    console.log("Error in createData", error)
  }
}