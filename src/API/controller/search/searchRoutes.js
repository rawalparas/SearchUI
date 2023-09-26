const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js');  // correct this part

router.get('/search', validation.validate(schema.search) , searchController.search);
router.get('/search/v2', validation.validate(schema.search) , searchController.searchv2);
router.get('/search/v3', validation.validate(schema.search) , searchController.searchv3);
router.get('/search/v4', validation.validate(schema.search) , searchController.searchv4);
router.post('/search/v5' , validation.validate(schema.searchv5) , searchController.searchv5);

module.exports = router;

// , validation.validate(schema.search) 