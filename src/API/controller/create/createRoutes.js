const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const createController = require('./createController.js');

router.post('/create', validation.validate(schema.book), createController.create)

module.exports = router;

