const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const book = require("../../../model/booksModel.js");
const Language = require("../../../model/languageModel.js");

module.exports = {
  insertBooks : async(req , res) => {
    try{
      // finding the language name in the language collection.
      let languageId = await Language.findOne({"name" : req.body.language});

      if(!languageId){
        // inserting the language in the language collection.
        languageId = await Language.create({"name" : req.body.language});
      }

      // finding the authorName in the author collection.
      let authorId = await author.findOne({"name" : req.body.author});

      if(!authorId){
        authorId = await author.create({"name" : req.body.author});
      }

      let bookData

      if(languageId._id && authorId._id){
        bookData = await book.create({"name" : req.body.name , "authorId" : authorId._id , "languageId" : languageId._id});
      }
      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    }catch(err){
      console.error(err);
      res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};
