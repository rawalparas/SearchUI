const messages = require("../../../helper/messages.js");
const bookModel = require('../../../model/bookModel.js');
const searchModel = require('../../../model/searchModel.js');

module.exports = {
  // method to get all the details of books.
  searchBook: async (req, res) => {
    try {
      const getBooksData = await bookModel.find({}, { _id: 0, __v: 0 }).populate("authorId", "-_id -__v").populate("languageId", "-_id -__v");
      return res.status(200).json({ "books": getBooksData })
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  // method to get the data from the search collection.
  searchData: async (req, res) => {
    try {
      const field = req.body.field;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 5;
      const offset = (pageNumber - 1) * limit;
      const searchData = await searchModel.find({ name: field }).skip(offset).limit(limit);
      return res.status(200).send(searchData);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};