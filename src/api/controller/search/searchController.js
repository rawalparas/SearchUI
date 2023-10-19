const messages = require("../../../helper/messages.js");
const searchModel = require("../../../model/searchModel.js");
const bookModel = require("../../../model/bookModel.js");
const authorModel = require('../../../model/authorModel.js');
const languageModel = require('../../../model/languageModel.js');

module.exports = {
  // method to get all the details of books.
  searchBook: async (req, res) => {
    try {
      const getBooksData = await bookModel
        .find({}, { _id: 0, __v: 0 })
        .populate("authorId", "-_id -__v")
        .populate("languageId", "-_id -__v");
      return res.status(200).json({ books: getBooksData });
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  // method to get the data from the search collection.
  globalSearch: async (req, res) => {
    try {
      let search = req.body.search;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;
      const searchData = await searchModel
        .aggregate([
          { $match: { name: { $regex: search, $options: "i" } } },
          { $project: { name: 1, s_id: 1, _id: 0 } },
        ])
        .skip(offset)
        .limit(limit);
      return res.status(200).send(searchData);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  bookSearch: async (req, res) => {
    try {
      let searchId = req.body.searchId;
      const type = req.body.type;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      switch (type){
        case "book" :
          model = bookModel;
          break;
        case "author" :
          model = authorModel;
          break;
        case "language" : 
          model = languageModel;
          break;
        default :
          return res.status(400).send(messages.INVALID_TYPE);
      }
      let searchResult = await findBook( model, { _id : searchId }  , offset , limit);

      if (!searchResult) {
        return res.status(404).send(messages.NO_RESULTS_FOUND);
      } 
      return res.status(200).send(searchResult); 

    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};


function findBook(model , query , offset , limit) {
  return model === bookModel ? model.find(query , {_id : 0 , __v : 0}).skip(offset).limit(limit)
  .populate("authorId", "-_id -__v")
  .populate("languageId", "-_id -__v") 
  : model.find(query).skip(offset).limit(limit);
}


// function findbook(query , offset , limit) {
//   return bookModel.find(query).skip(offset).limit(limit).populate("authorId", "-_id -__v").populate("languageId", "-_id -__v");
// }


  // bookSearch: async (req, res) => {
  //   try {
  //     let searchId = req.body.searchId;
  //     const type = req.body.type;
  //     const pageNumber = req.body.pageNumber;
  //     const limit = req.body.limit || 10;
  //     const offset = (pageNumber - 1) * limit;

  //     let searchResult;

  //     switch (type) {
  //       case "book":
  //         searchResult = await findbook({ _id: searchId } , offset , limit);
  //         break;
  //       case "author":
  //         searchResult = await findbook({ authorId : searchId } , offset , limit);
  //         break;
  //       case "language":
  //         searchResult = await findbook({ languageId : searchId } , offset , limit);
  //         break;
  //       default:
  //         return res.status(400).send(messages.INVALID_SEARCH);
  //     }
      
  //     if (!searchResult) {
  //       return res.status(404).send(messages.NO_RESULTS_FOUND);
  //     } 
  //     return res.status(200).send(searchResult); 

  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
  //   }
  // }
