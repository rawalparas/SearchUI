const mongoose = require('mongoose');
const authorModel = require("../../../model/authorModel.js");
const bookModel = require("../../../model/bookModel.js");
const languageModel = require("../../../model/languageModel.js");
const searchModel = require('../../../model/searchModel.js');
const messages = require("../../../helper/messages.js");

module.exports = {
  insertBook : async (req, res) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
      const sessionStart = session;
      const { name , author, language } = req.body;

      const [languageId , authorId] = await Promise.all([
        createIfNotExist(sessionStart , languageModel.model, { name : language}),
        createIfNotExist(sessionStart , authorModel.model, { name : author })
      ]);

      let bookData = await bookModel.model.create({
        name: name,
        authorId: authorId._id,
        languageId: languageId._id,
      });

      await Promise.all([
        createIfNotExist(sessionStart , searchModel , {name : bookData.name, type :  bookModel.type , s_id : bookData._id}),
        createIfNotExist(sessionStart , searchModel , {name : authorId.name, type :  authorModel.type , s_id : authorId._id}),
        createIfNotExist(sessionStart , searchModel , {name : languageId.name, type : languageModel.type , s_id : languageId._id})
      ]);

      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (err) {
      if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message)
      }
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};

function createIfNotExist(session , model, query) {
  return new Promise((resolve, reject) => {
    model.findOne(query).session(session)
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          resolve(model.create(query) , session );
        }
      })
      .catch((error) => {
        console.log("Error in findAndCreate" , error);
        throw error;
      });
  });
}


/* 
const mongoose = require('mongoose');
const authorModel = require("../../../model/authorModel.js");
const bookModel = require("../../../model/bookModel.js");
const languageModel = require("../../../model/languageModel.js");
const searchModel = require('../../../model/searchModel.js');
const messages = require("../../../helper/messages.js");

module.exports = {
  insertBook: async (req, res) => {
    const session = await mongoose.startSession();

    try {
      await session.startTransaction();
      const { name, author, language } = req.body;

      const [languageId, authorId] = await Promise.all([
        createIfNotExist(session, languageModel.model, { name: language }),
        createIfNotExist(session, authorModel.model, { name: author })
      ]);

      let bookData = await bookModel.model.create(
        {
          name: name,
          authorId: authorId._id,
          languageId: languageId._id,
        },
        { session }
      );

      await Promise.all([
        createIfNotExist(session, searchModel, { name: bookData.name, type: bookModel.type, s_id: bookData._id }),
        createIfNotExist(session, searchModel, { name: authorId.name, type: authorModel.type, s_id: authorId._id }),
        createIfNotExist(session, searchModel, { name: languageId.name, type: languageModel.type, s_id: languageId._id })
      ]);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(err.message);
      }
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};

function createIfNotExist(session, model, query) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await model.findOne(query).session(session);
      if (result) {
        resolve(result);
      } else {
        let created = await model.create(query, { session });
        resolve(created);
      }
    } catch (error) {
      console.log("Error in findAndCreate", error);
      reject(error);
    }
  });
}
*/