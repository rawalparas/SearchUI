const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const getController = require('./searchController.js');

router.get('/search', validation.validate(schema.books) , getController.search);

module.exports = router;