const Joi = require('joi');
const message = require('../../helper/messages.js');
const regex = require('../../helper/regexPatterns.js');

module.exports = {
    insert : Joi.object({
        name : Joi.string().required(),
        author : Joi.string().required(),
        language : Joi.string().required()
    }),
    search : Joi.object({
        search : Joi.string().required(),
        pageNumber : Joi.number().min(1).required(),
        limit : Joi.number().optional()
    })
}