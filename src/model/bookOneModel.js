const mongoose = require('mongoose');
const message = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');

const bookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateName,
        message: validateMessageName,
      },
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author', // Reference to the Author model
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'language', // Reference to the Language model
    },
  });
  
const model = mongoose.model("BookOne", bookSchema);
module.exports = model;



function validateName(value) {
    return regex.bookName.test(value);
}

function validateMessageName(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 2 || props.value.length > 50)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.bookName.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}

function validateAuthorId(value) {
    return regex.Id.test(value);
}

function validateMessageAuthorId(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 2 || props.value.length > 30)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.Id.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}

function validateSubjectId(value) {
    return regex.subject.test(value);
}

function validateMessagesSubjectId(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 1 || props.value.length > 25)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.bookName.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}

function validateLanguageId(value) {
    return regex.Id.test(value);
}

function validateMessageLanguageId(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 1 || props.value.length > 25)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.Id.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}
