const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const book = require("../../../model/bookModel.js");
const language = require("../../../model/languageModel.js");
const search = require('../../../model/searchModel.js');

module.exports = {
  insertBooks: async (req, res) => {
    try {
      const { name: bookName, author: authorName, language: languageName } = req.body;

      let languageId = await findAndCreate(language, languageName);
      let authorId = await findAndCreate(author, authorName);

      bookData = await book.create({
        name: bookName,
        authorId: authorId._id,
        languageId: languageId._id,
      });

      let search = await findAndCreateSearch(bookData.name, bookData._id);
      search = await findAndCreateSearch(authorId.name, authorId._id);
      search = await findAndCreateSearch(languageId.name, languageId._id);


      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
};

function findAndCreateSearch(name, object_id) {
  return new Promise((resolve, reject) => {
    search.findOne({ s_id: object_id })
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          resolve(search.create({ name: name, s_id: object_id }));
        }
      })
      .catch((error) => {
        console.log("Error in findAndCreateSearch", error);
        reject(error);
      });
  });
}

function findAndCreate(model, name) {
  return new Promise((resolve, reject) => {
    model.findOne({ name: name })
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          resolve(model.create({ name: name }));
        }
      })
      .catch((error) => {
        console.log("Error in findAndCreate" , error);
        reject(error);
      });
  });
}

// async function findAndCreate(model, name) {
//   try {
//     let modelId = await model.findOne({ name: name });
//     if (!modelId) modelId = await model.create({ name: name });
//     return modelId;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }