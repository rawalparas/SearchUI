const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js');  // correct this part

router.get('/search', validation.validate(schema.search) , searchController.search);
router.get('/search/v2', validation.validate(schema.search) , searchController.searchv2);

module.exports = router;