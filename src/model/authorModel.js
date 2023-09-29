const mongoose = require('mongoose');
const message = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateName,
            messages: validateMessageName
        }
    }
});

const model = mongoose.model("author", authorSchema);
module.exports = model;


function validateName(value) {
    return regex.authorName.test(value);
}

function validateMessageName(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 2 || props.value.length > 30)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.authorName.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}