const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

router.get('/search', validation.validate(schema.search) , searchController.searchGET);
router.post('/search', validation.validate(schema.search) , searchController.searchPOST);

module.exports = router;