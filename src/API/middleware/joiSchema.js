const Joi = require('joi');
const message = require('../../helper/messages.js');
const regex = require('../../helper/regexPatterns.js');

module.exports = {
    // insert : Joi.object({
    //     name : Joi.string().trim().min(2).max(50).regex(regex.name).required(),
    //     author : Joi.string().trim().min(2).max(50).regex(regex.author).required(),
    //     language : Joi.string().trim().min(2).max(50).regex(regex.language).required()
    // }),
    insert : Joi.object({
        name : Joi.string().required(),
        author : Joi.string().required(),
        language : Joi.string().required()
    })
}
