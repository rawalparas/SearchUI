const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

router.get('/search', validation.validate(schema.search) , searchController.searchGET);
router.post('/search', validation.validate(schema.search) , searchController.searchPOST);
router.get('/searchV3', validation.validate(schema.search) , searchController.searchGETV);
router.post('/search/v6', searchController.searchv6);
router.post('/search/v7', searchController.searchv7);
router.post('/search/v8', searchController.searchv8);



module.exports = router;

// , validation.validate(schema.search) 