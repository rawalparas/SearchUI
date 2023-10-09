const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const book = require("../../../model/booksModel.js");
const Language = require("../../../model/languageModel.js");

module.exports = {
  insertBooks : async(req , res) => {
    try{
      let languageId = await findLanguage(req);

      let authorId = await findAuthor(req);

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

async function findLanguage(req){
  let languageId = await Language.findOne({"name" : req.body.language});
  if(!languageId || languageId.length == 0){
    languageId = await Language.create({"name" : req.body.language});
  }
  return languageId;
}

async function findAuthor(req){
  let authorId = await author.findOne({"name" : req.body.author});
  if(!authorId || authorId.length == 0){
    authorId = await author.create({"name" : req.body.author});
  }
  return authorId;
}