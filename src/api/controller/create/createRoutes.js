const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const createController = require('./createController.js');

router.post('/insertBooks', validation.validate(schema.insertBooks), createController.insertBooks);
router.post('/insertBooksv2', validation.validate(schema.insertBooks), createController.insertBooksv2);

module.exports = router;

