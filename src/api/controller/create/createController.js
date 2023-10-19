const mongoose = require('mongoose');
const tryCatch = require('../../errorHandling/errohandler.js');
const authorModel = require("../../../model/authorModel.js");
const bookModel = require("../../../model/bookModel.js");
const languageModel = require("../../../model/languageModel.js");
const searchModel = require('../../../model/searchModel.js');
const messages = require("../../../helper/messages.js");

module.exports = {
  insertBooks : tryCatch(async (req, res) => {

    const { name , author, language } = req.body;

      const [languageId , authorId] = await Promise.all([
        createIfNotExist(languageModel, { name : language}),
        createIfNotExist(authorModel, { name : author })
      ]);

      let bookData = await bookModel.create({
        name: name,
        authorId: authorId._id,
        languageId: languageId._id,
      });

      const insertBooks = await Promise.all([
        createIfNotExist(searchModel , {name : bookData.name, type : "book", s_id : bookData._id}),
        createIfNotExist(searchModel , {name : authorId.name, type : "author", s_id : authorId._id}),
        createIfNotExist(searchModel , {name : languageId.name, type : "language", s_id : languageId._id})
      ]);
      if(insertBooks){
        return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
      }
      return  

      if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message)
      }
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
)};

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

/*
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

/*
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

*/
