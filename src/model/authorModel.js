const mongoose = require('mongoose');
const messages = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');
const modelvalidation = require('../model/booksModel.js');

const authorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator : modelvalidation.validateName(regex.author , value),
            messages : modelvalidation.validateMessageName(regex.author , props)
        }
    }
});

const model = mongoose.model("author", authorSchema);
module.exports = model;


// function validateName(value) {
//     return regex.test(value);
// }

// function validateMessageName(props) {
//     if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
//         return `${props.value} : ${messages.NOT_CONTAIN_SPACES_AT_START_AND_END}`
//     if (props.value.length < 2 || props.value.length > 30)
//         return `${props.value} : ${messages.INVALID_LENGTH}`
//     if (!regex.author.test(props.value))
//         return `${props.value} : ${messages.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
//     return messages.INVALID_FORMAT;
// }