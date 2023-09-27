const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

router.get('/search', validation.validate(schema.search) , searchController.searchGET);
router.post('/search', validation.validate(schema.search) , searchController.searchPOST);
router.get('/search/v3', validation.validate(schema.search) , searchController.searchv3);
router.post('/search/v5' , validation.validate(schema.searchv5) , searchController.searchv5);

module.exports = router;