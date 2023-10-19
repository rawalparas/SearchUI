const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

router.get('/searchbook' ,  searchController.searchBook);
router.post('/search' , validation.validate(schema.search) , searchController.globalSearch);
router.post('/book' , searchController.bookSearch);

module.exports = router;