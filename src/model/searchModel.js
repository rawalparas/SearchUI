const mongoose = require('mongoose');
const regex = require('../helper/regexPatterns.js');
const validateModel = require('../helper/helperMethods.js');
const { string } = require('joi');

const searchSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validateModel.validateName(value , regex.name)
            },
            message : function(props){
                const message = validateModel.validateMessageName(props , regex.name);
                return message;
            }
        }
    },
    type : {
        type : String,
        required : true
    },
    s_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

const model = mongoose.model("search",searchSchema);
module.exports = model;