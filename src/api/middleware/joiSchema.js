const Joi = require('joi');

module.exports = {
    fuzzySearch : Joi.object({
        search : Joi.string().required()
    }),
    insertBook : Joi.object({
        name : Joi.string().required(),
        author : Joi.string().required(),
        language : Joi.string().required()
    }),
    globalSearch : Joi.object({
        search : Joi.string().required(),
        pageNumber : Joi.number().min(1).required(),
        limit : Joi.number().optional()
    }),
    search : Joi.object({
        searchId : Joi.string().required(),
        type : Joi.string().required(),
        pageNumber : Joi.number().min(1).required(),
        limit : Joi.number().optional()
    })
}
