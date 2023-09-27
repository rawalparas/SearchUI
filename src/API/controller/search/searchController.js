const message = require("../../../helper/messages.js");
const book = require("../../../model/bookModel.js");

module.exports = {
  searchGET: async (req, res) => {
    try {
      const filters = req.query.filters;
      const search = req.query.search;
      const pageNumber = req.query.pageNumber;
      const limit = req.query.limit || 10;
      const offset = (pageNumber - 1) * limit;

      const searchObject = { $regex: new RegExp(search, "i") };
      let query = {};

      if (!filters) {
        query.$or = [
          { name: searchObject },
          { authorName: searchObject },
          { subject: searchObject },
          { language: searchObject },
        ];
      } else {
        const arrayFilter = Object.keys(filters).map((key) => ({
          [filters[key]]: searchObject,
        }));
        query = { $or: arrayFilter };
      }
      const getBooks = await book
        .find(query, { _id: 0, __v: 0 })
        .skip(offset)
        .limit(limit);
      return res.status(200).send(getBooks);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  },
  searchPOST: async (req, res) => {
    try {
      const filters = req.body.filters;
      const search = req.body.search;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      const searchObject = { $regex: new RegExp(search, "i") };
      let query = {};

      if (!filters) {
        query.$or = [
          { name: searchObject },
          { authorName: searchObject },
          { subject: searchObject },
          { language: searchObject },
        ];
      } else {
        const arrayFilter = Object.keys(filters).map((key) => ({
          [filters[key]]: searchObject,
        }));
        query = { $or: arrayFilter };
      }
      const getBooks = await book
        .find(query, { _id: 0, __v: 0 })
        .skip(offset)
        .limit(limit);
      return res.status(200).send(getBooks);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
};
