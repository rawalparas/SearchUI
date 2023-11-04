const createRoutes = require('../create/createRoutes.js');
const languageModel = require('../../../model/languageModel.js');
const authorModel = require('../../../model/authorModel.js');
const bookModel = require('../../../model/bookModel.js');
const searchModel = require('../../../model/searchModel.js');

module.exports = { 
    createRoutes,
    languageModel,
    authorModel,
    bookModel,
    searchModel
}