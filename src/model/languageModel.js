const mongoose = require('mongoose');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/helperMethods.js')

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        unique : true,
        validate: {
            validator: function(value){
                return validateSchemaName.validateName(value , regex.language)
            },
            message : function(props){
                const message = validateSchemaName.validateMessageName(props , regex.language)
                return message;
            }
        },
    },
});

const model = mongoose.model("languages", languageSchema);
module.exports = model;
