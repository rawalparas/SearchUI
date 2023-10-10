const mongoose = require('mongoose');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/validateModelMethod.js');

const bookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      validate : {
        validator : function(value){
          return validateSchemaName.validateName(value,regex.name);
        },
        message : function(props){
          return validateSchemaName.validateMessageName(props, regex.name)
        }
      }
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author', // Reference to the Author model
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'languages', // Reference to the Language model
    },
  });
  
const model = mongoose.model("Book", bookSchema);
module.exports = model;
