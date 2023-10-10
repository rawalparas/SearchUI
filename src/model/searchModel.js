const mongoose = require('mongoose');
const regex = require('../helper/regexPatterns.js');
// const validateModel = require('../helper/validateModelMethod.js');

const searchSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        // validate : {
        //     validator : function(value){
        //         return validateModel.validateName(value , regex.name)
        //     },
        //     message : function(props){
        //         return validateModel.validateMessageName(props , regex.name)
        //     }
        // }
    },
    s_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        // validate : {
        //     validator : function(value){
        //         return 
        //     },
        //     message : function(props){
        //         return 
        //     }
        // }
    }
})

const model = mongoose.model("search",searchSchema);
module.exports = model;