const mongoose = require('mongoose');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/helperMethods.js')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validateSchemaName.validateName(value, regex.author)
            },
            message: function (props) {
                const message = validateSchemaName.validateMessageName(props, regex.author);
                return message;
            },
        }
    }
});
const type = "author";

const model = mongoose.model("author", authorSchema );
module.exports = { model , type};
