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
  },
  searchGETV: async (req, res) => {
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
        const fieldHeaders = Object.keys(filters);
        // console.log(fieldHeaders.map((key) => ({
        //   [filters[key]]: searchObject,
        // })))
        const arrayFilter = fieldHeaders.map((key) => ({
          [filters[key]]: searchObject,
        }));
        query = { $or: arrayFilter };

        // Create an object to store results by field
        const resultsByField = {};

        // Create a header object for each field
        fieldHeaders.forEach((field) => {
          resultsByField[field] = {
            header: Object.keys(field),
            results: [],
          };
        });

        // Query MongoDB
        const getBooks = await book.find(query, { _id: 0, __v: 0 });

        // Organize results by field
        getBooks.forEach((book) => {
          fieldHeaders.forEach((field) => {
            if (
              book[filters[field]] &&
              book[filters[field]].match(searchObject)
            ) {
              resultsByField[field].results.push(book);
            }
          });
        });

        // Convert the results to an array
        const resultsArray = fieldHeaders.map((field) => resultsByField[field]);

        return res.status(200).send(resultsArray);
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
  searchv6: async (req, res) => {
    try {
      const filters = req.query.filters;
      const search = req.query.search;
      const pageNumber = req.query.pageNumber;
      const limit = req.query.limit || 10;
      const offset = (pageNumber - 1) * limit;

      const searchObject = { $regex: new RegExp(search, "i") };

      const aggregationPipeline = [];

      // Define fields to search (e.g., "name", "authorName", "subject", "language")
      const fieldsToSearch = ["name", "authorName", "subject", "language"];

      // Use $or to search in all specified fields
      const orConditions = fieldsToSearch.map((field) => ({ [field]: searchObject }));
      aggregationPipeline.push({ $match: { $or: orConditions } });

      // Add a $group stage to group by the unique values of "name" and "authorName"
      aggregationPipeline.push({
        $group: {
          _id: { name: "$name", authorName: "$authorName" }, // Group by unique "name" and "authorName" combinations
          data: { $push: "$$ROOT" }, // Store all documents in this group
        },
      });

      // Add another $group stage to group by the field name and store the "header"
      aggregationPipeline.push({
        $group: {
          _id: null, // Group all "name" and "authorName" groups together
          groupedData: {
            $push: {
              header: { $cond: [{ $eq: ["$_id.name", null] }, "authorName", "name"] }, // Determine the header ("name" or "authorName")
              data: "$data", // Store the matching documents
            },
          },
        },
      });

      // Unwind the groupedData array
      aggregationPipeline.push({ $unwind: "$groupedData" });

      // Project to reshape the output
      aggregationPipeline.push({
        $project: {
          _id: 0,
          header: "$groupedData.header",
          data: "$groupedData.data",
        },
      });

      // Skip and limit for pagination
      // aggregationPipeline.push({ $skip: offset });
      // aggregationPipeline.push({ $limit: limit });

      const results = await book.aggregate(aggregationPipeline);

      return res.status(200).send(results);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  },
  // searchv6: async (req, res) => {
  //   try {
  //     const filters = req.body.filters;
  //     const search = req.body.search;
  //     const pageNumber = req.body.pageNumber;
  //     const limit = req.body.limit || 10;
  //     const offset = (pageNumber - 1) * limit;

  //     const searchObject = { $regex: new RegExp(search, "i") };

  //     const aggregation = [];

  //     // const fieldsToSearch = ["name", "authorName", "subject", "language"];

  //     // const orConditions = fieldsToSearch.map((key) => ({[filters[key]]: searchObject,}));
  //     // console.log(orConditions);

  //     // // Use $or to search in all specified fields
  //     const arrayFilter = Object.keys(filters).map((key) => ({
  //       [filters[key]]: searchObject,
  //     }));
  //     // console.log(arrayFilter);

  //     // aggregation.push({
  //     //   $group : {
  //     //     arrayFilter : { }
  //     //   }
  //     // })

  //     // Add a $group stage to group by the unique values of "name" and "authorName"
  //     aggregation.push({$match : { $or : arrayFilter}},
  //       {
  //       $group: {
  //         _id: { name: "$name", authorName: "$authorName" , language : "$language" , subject : "$subject" }, // Group by unique "name" and "authorName" combinations
  //         data: { $push: "$$ROOT" }, // Store all documents in this group
  //       },
  //     });
  //     console.log(aggregation)

  //     // Add another $group stage to group by the field name and store the "header"
  //     // aggregation.push({
  //     //   $group: {
  //     //     _id: null, // Group all "name" and "authorName" groups together
  //     //     groupedData: {
  //     //       $push: {
  //     //         field : { $cond: [{ $eq: ["$_id.name", null] }, "authorName", "name"] }, // Determine the header ("name" or "authorName")
  //     //         data: "$data", // Store the matching documents
  //     //       },
  //     //     },
  //     //   },
  //     // });
  //     console.log(aggregation)

  //     // Unwind the groupedData array
  //     // aggregation.push({ $unwind: "$groupedData" });

  //     // // Project to reshape the output
  //     // aggregation.push({
  //     //   $project: {
  //     //     _id: 0,
  //     //     header: "$groupedData.header",
  //     //     data: "$groupedData.data",
  //     //   },
  //     // });

  //     // Skip and limit for pagination
  //     aggregation.push({ $skip: offset });
  //     aggregation.push({ $limit: limit });

  //     const results = await book.aggregate(aggregation);
  //     // results = results.toArray();

  //     return res.status(200).send(results);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).send({ error: "Internal server error" });
  //   }
  // },
  searchv7: async (req, res) => {
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

      const pipeline = [
        { $match: query },
        {
          $group: {
            _id: 0,
            data: { $push: "$$ROOT" }
          },
        },
      ];

      const aggregatedData = await book.aggregate(pipeline);

      const response = {
        data: aggregatedData,
      };

      return res.status(200).send(response);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  },
  searchv8: async (req, res) => {
    try {
      const filters = req.body.filters;
      const search = req.body.search;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;

      const searchObject = { $regex: new RegExp(search, "i") };
      let query = {};
      let arrayFilter = {};

      if (!filters) {
        query.$or = [
          { name: searchObject },
          { authorName: searchObject },
          { subject: searchObject },
          { language: searchObject },
        ];
      } else {
        arrayFilter = Object.keys(filters).map((key) => ({
          [filters[key]]: searchObject
        }));
        query = { $or: arrayFilter };
      }
      // console.log(arrayFilter);

      const pipeline = [
        {
          $match: query,
        },
        {
          $group: {
            _id: null,
            name: {
              $addToSet: {
                name: "$name",
                authorName: "$authorName",
                price: "$price",
                subject: "$subject",
                language: "$language",
              },
            },
            author: {
              $addToSet: {
                name: "$name",
                authorName: "$authorName",
                price: "$price",
                subject: "$subject",
                language: "$language",
              },
            },
            language: {
              $addToSet: {
                name: "$name",
                authorName: "$authorName",
                price: "$price",
                subject: "$subject",
                language: "$language",
              },
            },
            subject : {
              $addToSet : {
                name : "$name",
                authorName : "$authorName",
                language : "$language",
                subject : "$subject"
              }
            }
          },
        },
        {
          $project: {
            _id: 0,
          },
        }
      ];

      const groupedResults = await book.aggregate(pipeline);

      return res.status(200).send(groupedResults[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
};
