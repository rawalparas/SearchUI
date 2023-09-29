const mongoose = require('mongoose');
const message = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: validateLanguage,
            message: validateMessageLanguage,
        },
    },
});
const model = mongoose.model("language", languageSchema);
module.exports = model;


function validateLanguage(value) {
    return regex.languageModel.test(value);
}

function validateMessageLanguage(props) {
    if (props.value.charAt(0) == ' ' || props.value.charAt(props.value.length - 1) == ' ')
        return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
    if (props.value.length < 1 || props.value.length > 25)
        return `${props.value} : ${message.INVALID_LENGTH}`
    if (!regex.languageModel.test(props.value))
        return `${props.value} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
    return message.INVALID_FORMAT;
}
