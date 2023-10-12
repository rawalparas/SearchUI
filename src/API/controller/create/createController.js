const author = require("../../../model/authorModel.js");
const messages = require("../../../helper/messages.js");
const book = require("../../../model/bookModel.js");
const language = require("../../../model/languageModel.js");
const search = require('../../../model/searchModel.js');

module.exports = {
  insertBooks: async (req, res) => {
    try {
      const { name: bookName, author: authorName, language: languageName } = req.body;

      let languageId = await findAndCreate(language , languageName);
      let authorId = await findAndCreate(author , authorName );

      bookData = await book.create({
        name: bookName,
        authorId: authorId._id,
        languageId: languageId._id,
      });

      let searchBook = await findData(bookData._id);
      if (!searchBook) searchBook = await createData(bookData.name, bookData._id);

      let searchAuthor = await findData(authorId._id);
      if (!searchAuthor) searchAuthor = await createData(authorId.name, authorId._id);

      let searchLanguage = await findData(languageId._id);
      if (!searchLanguage) searchLanguage = await createData(languageId.name, languageId._id);

      return res.status(200).send(messages.SUCCESSSFULLY_CREATED);
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
};


async function findAndCreate(model , name){
  try{
    console.log(model);
    console.log(name);
    let modelId = await model.findOne({name : name});
    if(!modelId) modelId = await model.create({name : name});
    return modelId;
  }catch(error){
    console.log(error);
    return res.status(400).send(messages.BAD_REQUEST);
  }
}


function findData(Object_id) {
  return new Promise((resolve, reject) => {
    search.findOne({ s_id: Object_id })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Error in findData:", error);
        reject(error);
      });
  });
}

function createData(name, Object_id) {
  return new Promise((resolve, reject) => {
    search.create({
      name,
      s_id: Object_id
    }).then((result) => {
      resolve(result);
    })
      .catch((error) => {
        console.log("Error in createData", error);
        reject(error);
      });
  });
}



      // if (!authorId || authorId.length == 0) authorId = await author.create({ name: authorName });
      // if (!languageId || languageId.length == 0) languageId = await language.create({ name: languageName });
