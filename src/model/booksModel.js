const mongoose = require('mongoose');
const message = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/validateModelMethod.js')

const bookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      validate : {
        validator: validateSchemaName.validateName(regex.name , value),
        message : validateSchemaName.validateMessageName(regex.name , value),
      },
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


// function validateName(regex , value){
//     return regex.test(value);
// }

// function validateMessageName(regex , props) {
//     if (props.value.charAt(0) == ' ' || props.value.charAt(props.length - 1) == ' ')
//         return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
//     if (props.value.length < 2 || props.value.length > 50)
//         return `${props.value} : ${message.INVALID_LENGTH}`
//     if (!regex.test(props.value))
//         return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
//     return message.INVALID_FORMAT;
// }