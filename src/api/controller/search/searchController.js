const Fuse = require('fuse.js');
const messages = require("../../../helper/messages.js");
const searchModel = require("../../../model/searchModel.js");
const bookModel = require("../../../model/bookModel.js");
const authorModel = require('../../../model/authorModel.js');
const languageModel = require('../../../model/languageModel.js');

module.exports = {
   // method to get all the details of books.
   allBook: async (req, res) => {
    try {
      let getBooksData = await bookModel.model
        .find({}, { _id: 0, __v: 0 })
        .populate("authorId", "-_id -__v")
        .populate("languageId", "-_id -__v");


      let fuseSearch = new Fuse(getBooksData, options);
      getBooksData = fuseSearch.search()

      // const foundBooks = searchResult.map((result) => result.item);

      return res.status(200).json({ books: getBooksData });
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  fuzzySearch : async (req, res) => {
    try {
      const search = req.query.search;
 
      let getData = await bookModel.model.find({}, { _id: 0, __v: 0 })
        .populate("authorId", "-_id -__v")
        .populate("languageId", "-_id -__v");

      const options = {
        keys: ['name'],
        includeScore: true, 
        threshold: 0.4, 
      };

      const fuse = new Fuse(getData, options);
      const result = fuse.search(search); 

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred." });
    }
  },
  // method to get the data from the search collection.
  globalSearch: async (req, res) => {
    try {
      let search = req.body.search;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      const fuzzySearch = await searchModel.find({}).skip(offset).limit(limit); 

      const searchData = await searchModel
        .aggregate([
          { $match: { name: { $regex : search, $options: "i" } } },
          { $project: { name: 1, s_id: 1, _id: 0 } },
        ])
        .skip(offset)
        .limit(limit);

      const options = {
        keys : ['name'],
        includeScore : true,
        threshold : 0.4
      }

      let fuse = new Fuse(fuzzySearch , options);
      searchUsingFuzzy = fuse.search(search);

      return res.status(200).json({"Using Regex" : searchData , "Using fuzzysearch" : searchUsingFuzzy});
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  search: async (req, res) => {
    try {
      let searchId = req.body.searchId;
      const type = req.body.type;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      switch (type) {
        case "book":
          model = bookModel.model;
          break;
        case "author":
          model = authorModel.model;
          break;
        case "language":
          model = languageModel.model;
          break;
        default:
          return res.status(400).send(messages.INVALID_TYPE);
      }
      let searchResult = await findBook(model, { _id: searchId }, offset, limit);

      console.log(searchResult)

      let options = {
        keys : ['name'],
        includeScore : true,
        threshold : 0.4
      };

      searchResult = fuzzySearch(searchResult, searchId);

      // let fuse = new Fuse(searchResult , options);
      // searchResult = fuse.search(searchId);

      if (searchResult.length === 0) {
        return res.status(404).send(messages.NO_RESULTS_FOUND);
      }
      return res.status(200).send(searchResult);

    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};


const fuzzySearch = (list, searchId) => {
  let options = {
    keys: ['name'],
    includeScore: true,
    threshold: 0.4,
    isCaseSensitive: false, // You can adjust this option as needed
    includeMatches: true, // This will include the matched characters
  };

  let fuse = new Fuse(list, options);
  return fuse.search(searchId);
};

function findBook(model, query, offset, limit) {
  return model === bookModel.model ? model.find(query , { _id: 0, __v: 0 }).skip(offset).limit(limit)
    .populate("authorId", "-_id -__v")
    .populate("languageId", "-_id -__v")
    : model.find(query).skip(offset).limit(limit);
}

 // const foundBooks = searchResult.map((result) => result.item); 