const Fuse = require("fuse.js");
const messages = require("../../../helper/messages.js");
const searchModel = require("../../../model/searchModel.js");
const bookModel = require("../../../model/bookModel.js");
const authorModel = require("../../../model/authorModel.js");
const languageModel = require("../../../model/languageModel.js");
const pgBook = require('../../../../models');

module.exports = {
  // Method to find all the data from the tables.
  search: async (req, res) => {
    try {
      const models = req.query.model;
      // const pageNumber = req.query.pageNumber;
      // const limit = req.query.limit || 2;
      // const offset = (pageNumber - 1) * limit;

      let searchResult = [];

      if (!models || models.length === 0) {
        let models = [pgBook.book, pgBook.author, pgBook.language];
  
        await Promise.all(
          models.map(async (model) => {
            const result = await model.findAll();
            searchResult.push(result);
          })
        );
        return res.status(200).send(searchResult);
      }
      await Promise.all(
        models.map(async (model) => {
          const result = await model.findAll();
          searchResult.push(result); 
      }));

      if (!searchResult) {
        return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
      }
      return res.status(200).send(searchResult)
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  // Method to performing the global search from the search collection..
  globalSearch: async (req, res) => {
    try {
      const search = req.body.search;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      console.log(search);

      const pipeline = [
        { $match: { name: { $regex: search, $options: "i" } } },
        { $project: { name: 1, s_id: 1, type: 1, _id: 0 } },
      ];

      const searchData = await searchModel
        .aggregate(pipeline)
        .skip(offset)
        .limit(limit);

      console.log(searchData);

      if (!searchData) return res.status(500).send(messages.INTERNAL_SERVER_ERROR);

      return res.status(200).send(searchData);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  globalFuzzySearch: async (req, res) => {
    try {
      const searchValue = req.body.search;
      console.log(searchValue);

      const allBooks = await findBooks(searchModel, {});
      console.log(allBooks);

      if (!allBooks) {
        return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
      }

      const fuzzyBooks = await fuzzySearch(allBooks, searchValue);
      console.log(fuzzyBooks);

      if (!fuzzyBooks) {
        return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
      }
      return res.status(200).send(fuzzyBooks);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  select: async (req, res) => {
    try {
      const searchId = req.body.searchId;
      const type = req.body.type;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      console.log(searchId);

      let model;

      switch (type) {
        case bookModel.type:
          model = bookModel.model;
          break;
        case authorModel.type:
          model = authorModel.model;
          break;
        case languageModel.type:
          model = languageModel.model;
          break;
        default:
          return res.status(400).send(messages.NOT_FOUND);
      }
      console.log(model);

      const searchResult = await findBooks(
        model,
        { _id: searchId },
        offset,
        limit
      );
      console.log(searchResult);

      if (!searchResult) return res.status(500).send(messages.INTERNAL_SERVER_ERROR);

      return res.status(200).send(searchResult);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
};

async function findBooks(model, query, offset, limit) {
  return model === bookModel.model
    ? model
      .find(query, { _id: 0, __v: 0 })
      .skip(offset)
      .limit(limit)
      .populate("authorId", "-_id -__v")
      .populate("languageId", "-_id -__v")
    : model.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
}

function fuzzySearch(books, searchValue) {
  return new Promise((resolve, reject) => {
    const options = {
      keys: ['name'],
      includeScore: false,
      threshold: 0.4,
    };
    try {
      const fuse = new Fuse(books, options);
      const fuzzyResults = fuse.search(searchValue);
      const fuzzyItems = fuzzyResults.map(result => result.item);
      resolve(fuzzyItems);
    } catch (error) {
      console.log("Error in fuzzySearch:", error);
      throw error;
    }
  })
};


// let searchResult = [];
//       const models = [pgBook.book , pgBook.author , pgBook.language];

//       if(search && search.length != 0){
//         await Promise.all(models.map(async (model) => {
//           result = await model.findAll()
//         }))
//       }
//       searchResult = await pgBook.book.findAll(); 