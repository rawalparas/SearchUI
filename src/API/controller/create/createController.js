const books = require("../../../model/bookModel.js");
const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const book = require("../../../model/bookOneModel.js");
const Language = require("../../../model/languageModel.js");

module.exports = {
  create: async (req, res) => {
    try {
      const createBook = await books.create(req.body);

      console.log("Inserted data: ", createBook);
      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (e) {
      console.log("Unexpected Error: " + e.message);
      return res.status(500).send({ message: e.message });
    }
  },
  createAuthor: async (req, res) => {
    try {
      const createAuthor = await author.create(req.body);

      console.log("Inserted data: ", createAuthor);
      return res
        .status(200)
        .json({ message: messages.SUCCESSSFULLY_CREATED, value: createAuthor });
    } catch (err) {
      console.log("Unexpected Error: " + err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  createLanguage: async (req, res) => {
    try {
      console.log(req.body);
      const createLanguage = await Language.create(req.body);

      console.log("Inserted data: ", createLanguage);
      return res
        .status(200)
        .json({
          message: messages.SUCCESSSFULLY_CREATED,
          value: createLanguage,
        });
    } catch (err) {
      console.log("Unexpected Error: " + err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  createBook: async (req, res) => {
    try {
      const { name, authorId, languageId } = req.body;

      const newBook = new book({
        name,
        authorId,
        languageId,
      });
      await newBook.save();

      const populatedBook = await book
        .findById(newBook._id)
        .populate("authorId", "name") 
        .populate("languageId", "name");

      res.status(201).json(populatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  insertBooks : async(req , res) => {
    try{
        
      // finding the language name in the language collection.
      let languageId = await Language.findOne({"name" : req.body.language});

      if(!languageId){
        // inserting the language in the language collection.
        languageId = await Language.create({"name" : req.body.language});
      }

      // finding the authorName in the author collection.
      let authorId = await author.findOne({"name" : req.body.authorName});

      if(!authorId){
        authorId = await author.create({"name" : req.body.authorName});
      }

      let bookData

      if(languageId._id && authorId._id){
        bookData = await book.create({"name" : req.body.name , "authorId" : authorId._id , "languageId" : languageId._id});
      }

      bookData = await book.findById(bookData._id).populate("authorId" , "name").populate("languageId" , "name");
      return res.status(200).json({"Book Created Successfully" : bookData});
    }catch(err){
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};
