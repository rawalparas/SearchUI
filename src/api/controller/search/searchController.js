const messages = require("../../../helper/messages.js");
const bookModel = require("../../../model/bookModel.js");
const searchModel = require("../../../model/searchModel.js");
const mongoose = require('mongoose');

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
  globalSearch : async (req, res) => {
    try {
      let search = req.body.search;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber - 1) * limit;
      const searchData = await searchModel
        .aggregate([
          { $match: { name: { $regex: search, $options: "i" } } },
          { $project: { name: 1, s_id: 1 , _id : 0} },
        ])
        .skip(offset)
        .limit(limit);
      return res.status(200).send(searchData);
    } catch (error) {
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  },
  bookSearch : async(req , res) => {
    try{
      const searchId = req.body.searchId;
      const type = req.body.type;
      const pageNumber = req.body.pageNumber;
      const limit = req.body.limit || 10;
      const offset = (pageNumber-1) * limit;

      console.log(searchId);
      console.log(type);
      console.log(pageNumber);
      console.log(offset);
      
      switch(type):
      case : author

    

      // const searchBookbySearchID = await findbook(type , {_id : searchId})

      return res.status(200).send(searchBookbySearchID);
    }catch(error){
      console.log(error);
      return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
  }
};

function findbook(type, query){
  return type.find(query).exec();
}



// function findbook(model , query){
//   return new Promise((resolve , reject) => {
//     model.find(query)
//     .then((result) => {
//       resolve(result);
//     })
//     .catch((error) => {
//       console.log("Error in find", error)
//     })
//   })
// }



/*
const messages = {
  INTERNAL_SERVER_ERROR: 'Internal server error occurred.',
};

const searchBySearchID = async (req, res) => {
  try {
    const searchId = req.body.searchId;
    const type = req.body.type;
    const pageNumber = req.body.pageNumber;
    const limit = req.body.limit || 10;
    const offset = (pageNumber - 1) * limit;

    const searchBookbySearchID = await findBook(type, { _id: searchId });

    if (searchBookbySearchID) {
      return res.status(200).send(searchBookbySearchID);
    } else {
      return res.status(404).send('No matching records found.');
    }
  } catch (error) {
    console.error('Error in searchBySearchID:', error);
    return res.status(500).send(messages.INTERNAL_SERVER_ERROR);
  }
};

function findBook(model, query) {
  return model.find(query).exec(); // Use .exec() to return a promise
}

module.exports = {
  searchBySearchID,
};
*/
