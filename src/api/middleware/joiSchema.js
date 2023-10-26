const Joi = require("joi");

module.exports = {
  globalSearch: Joi.object({
    search: Joi.string().required(),
    pageNumber: Joi.number().min(1).required(),
    limit: Joi.number().optional(),
  }),
  globalFuzzySearch : Joi.object({
    search : Joi.string().required()
  }),
  select: Joi.object({
    searchId: Joi.string().required(),
    type: Joi.string().required(),
    pageNumber: Joi.number().min(1).required(),
    limit: Joi.number().optional(),
  }),
  insertBooks : Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
      language: Joi.string().required(),
    })
  )
};