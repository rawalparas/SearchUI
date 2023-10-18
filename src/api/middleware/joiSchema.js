const Joi = require('joi');

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
    }),
    book : Joi.object({
        searchId : Joi.string().required(),
        pageNumber : Joi.number().min(1).required(),
        limit : Joi.number().optional()
    })
}
