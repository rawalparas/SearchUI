const Fuse = require("fuse.js");
const messages = require("../../../helper/messages.js");
const searchModel = require("../../../model/searchModel.js");
const bookModel = require("../../../model/bookModel.js");
const authorModel = require("../../../model/authorModel.js");
const languageModel = require("../../../model/languageModel.js");

module.exports = {
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
          { $project: { name: 1, s_id: 1, type: 1, _id: 0 } },
        ])
        .skip(offset)
        .limit(limit);

      return res.status(200).send(searchData);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  globalfuzzysearch: async (req, res) => {
    try {
      const search = req.body.search;

      const allData = await findBook(searchModel , {})

      const fuzzySearchResult = fuzzySearch(allData , search)

      return res.status(200).send(fuzzySearchResult);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  select: async (req, res) => {
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
      let searchResult = await findBook(
        model,
        { _id: searchId },
        offset,
        limit
      );

      if (!searchResult || searchResult.length === 0) {
        return res.status(404).send(messages.NO_RESULTS_FOUND);
      }
      return res.status(200).send(searchResult);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
};

function findBook(model, query, offset, limit) {
  return model === bookModel.model
    ? model
      .find(query, { _id: 0, __v: 0 })
      .skip(offset)
      .limit(limit)
      .populate("authorId", "-_id -__v")
      .populate("languageId", "-_id -__v")
    : model.find(query ,  { _id: 0, __v: 0 }).skip(offset).limit(limit);
}

const fuzzySearch = (allData , search) => {
  const options = {
    keys: ['name'],
    includeScore: false,
    threshold: 0.4,
  };

  let fuse = new Fuse(allData, options);
  let fuzzySearch = fuse.search(search);
  fuzzySearch = fuzzySearch.map(result => result.item);

  return fuzzySearch;
}