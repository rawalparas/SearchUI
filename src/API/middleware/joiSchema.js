const Joi = require('joi');
const message = require('../../helper/messages.js');
const regex = require('../../helper/regexPatterns.js');

module.exports = {
    book: Joi.object({
        name: Joi.string().regex(regex.bookName).min(1).max(20).required().messages({
            'string.empty': message.REQUEST_BODY_NOT_BE_EMPTY,
            'string.pattern.base': `"name : "${message.REGEX_PATTERN_UNMATCHED}`
        }),
        authorName: Joi.string().regex(regex.authorName).min(2).max(25).required().messages({
            'string.empty': message.REQUEST_BODY_NOT_BE_EMPTY,
            'string.pattern.base': `"authorName : "${message.REGEX_PATTERN_UNMATCHED}`
        }),
        subject: Joi.string().regex(regex.subject).min(1).max(15).required().messages({
            'string.empty': message.REQUEST_BODY_NOT_BE_EMPTY,
            'string.pattern.base': `"subject : "${message.REGEX_PATTERN_UNMATCHED}`
        }),
        price: Joi.string().regex(regex.price).length(6).required().messages({
            'string.empty': message.REQUEST_BODY_NOT_BE_EMPTY,
            'string.pattern.base': `"price : "${message.REGEX_PATTERN_UNMATCHED}`
        }),
        language: Joi.string().regex(regex.language).default("English").messages({
            'string.empty': message.REQUEST_BODY_NOT_BE_EMPTY,
            'string.pattern.base': `"language :" ${message.REGEX_PATTERN_UNMATCHED}`
        })
    }),
    search: Joi.object({
        field : Joi.string().min(1).max(25).messages(),
        name: Joi.string().regex(regex.bookName).min(1).max(20).messages(),
        authorName: Joi.string().regex(regex.authorName).min(2).max(25).messages(),
        price: Joi.string().regex(regex.price).messages(),
        language: Joi.string().regex(regex.language).default("English").messages(),
        subject: Joi.string().regex(regex.subject).min(1).max(15).messages(),
        pageNumber: Joi.number().min(1).required().messages(),
    })
}
