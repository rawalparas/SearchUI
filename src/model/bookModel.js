const mongoose = require('mongoose');
const message = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        validate: {
            validator: validateBookName,
            messages: validateMessageBookName
        }
    },
    authorName: {
        type: String,
        required: true,
        validate: {
            validator: validateAuthorName,
            messages: validateMessageAuthorName
        }
    },
    price: {
        type: String,
        required: true,
        validate: {
            validator: validatePrice,
            messages: validateMessagesPrice
        }
    },
    subject: {
        type: String,
        required: true,
        validate: {
            validator: validateSubject,
            messages: validateMessagesSubject
        }
    },
    language : {
        type : String,
        validate : {
            validator : validateLanguage,
            messages : validateMessageLanguage
        }
    }
});
const model = mongoose.model("Books", bookSchema);
module.exports = model;

function validateBookName(value) {
    return regex.bookName.test(value);
}

function validateMessageBookName(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 2 || props.value.length > 50)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.bookName.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}

function validateAuthorName(value) {
    return regex.authorName.test(value);
}

function validateMessageAuthorName(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 2 || props.value.length > 30)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.authorName.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}

function validatePrice(value) {
    return regex.price.test(value);
}

function validateMessagesPrice(props){
    if (!regex.price.test(props.value)) {
        return `${props.value} : ${message.MUST_CONTAIN_DIGITS}`;
    }
    return message.INVALID_FORMAT;
}

function validateSubject(value){
    return regex.subject.test(value);
}

function validateMessagesSubject(props){
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 1 || props.value.length > 25)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.bookName.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}

function validateLanguage(value){
    return regex.language.test(value);
}

function validateMessageLanguage(props){
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 1 || props.value.length > 25)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.language.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}
