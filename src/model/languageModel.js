const mongoose = require('mongoose');
const message = require('../helper/messages.js');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/validateModelMethod.js')

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator : function(value){
                return validateSchemaName.validateName(value , regex.language)
            },
            message: function(props){
                return validateSchemaName.validateMessageName(props , regex.language)
            }
        },
    },
});
const model = mongoose.model("languages", languageSchema);
module.exports = model;
