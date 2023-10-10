const mongoose = require('mongoose');
const messages = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/validateModelMethod.js')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validateSchemaName.validateName(value, regex.name);
            },
            message: function (props) {
                return validateSchemaName.validateMessageName(props, regex.name)
            }
        }
    }
});

const model = mongoose.model("author", authorSchema);
module.exports = model;