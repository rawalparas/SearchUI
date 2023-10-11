const mongoose = require('mongoose');
const regex = require('../helper/regexPatterns.js');
const validateSchemaName = require('../helper/validateModelMethod.js')

const authorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        validate: {
            validator : function(value){
                return validateSchemaName.validateName( value , regex.author)
            },
            message : function(props){
                return validateSchemaName.validateMessageName( props , regex.author)
            }
        }
    }
});


const model = mongoose.model("author", authorSchema);
module.exports = model;
