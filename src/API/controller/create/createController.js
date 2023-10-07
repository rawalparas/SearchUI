const books = require("../../../model/bookModel.js");
const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const bookOne = require("../../../model/bookOneModel.js");
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
      const createLanguage = await language.create(req.body);

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

      const newBook = new bookOne({
        name,
        authorId,
        languageId,
      });
      await newBook.save();

      const populatedBook = await bookOne
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
      // const {name , author , language} = req.body;

      // console.log(language);

      let languageData = await Language.find({"name" : req.body.language});
      console.log(languageData)

      if (!languageData._id){
        let languageData = await Language.create(req.body.language);
        return languageData;
      }
      return res.send(languageData);
    }catch(err){
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};
