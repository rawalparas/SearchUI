const book = require('../model/bookModel');
const author = require('../model/authorModel');
const language = require('../model/languageModel');
const search = require('../model/searchModel');

console.log(book);
console.log(author);
console.log(language);
console.log(search);

module.exports = {
    book,
    search,
    author,
    language
}