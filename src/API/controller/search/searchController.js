const messages = require("../../../helper/messages.js");
const books  = require('../../../model/booksModel.js');

module.exports = {
  // method to get all the details of books.
  searchBook : async(req , res) => {
    try {
      const getBooksData = await books.find({} , {_id : 0 , __v : 0 }).populate("authorId" , "-_id -__v").populate("languageId" ,"-_id -__v");
      return res.status(200).json({"books" : getBooksData})
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};