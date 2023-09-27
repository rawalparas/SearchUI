const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

router.get('/search', validation.validate(schema.search) , searchController.searchGET);
router.post('/search', validation.validate(schema.search) , searchController.searchPOST);
router.get('/searchV3', validation.validate(schema.search) , searchController.searchGETV);
router.get('/searchV4', validation.validate(schema.search) , searchController.searchv4);

module.exports = router;