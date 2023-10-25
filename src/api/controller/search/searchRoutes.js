const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

router.get('/allbook' , searchController.allBook);
router.get('/allbook/fuzzysearch' , validation.validate(schema.fuzzySearch) , searchController.fuzzySearch);
router.post('/globalsearch' , validation.validate(schema.globalSearch) , searchController.globalSearch);
router.post('/search' , validation.validate(schema.search) , searchController.search);

module.exports = router;