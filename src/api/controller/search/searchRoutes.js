const express = require('express');
const router = express.Router();

const validation = require('../../middleware/validator.js');
const schema = require('../../middleware/joiSchema.js');

const searchController = require('./searchController.js'); 

// router.get('/searchbook' , validation.validate(schema.search) , searchController.searchBook);
router.post('/search' , validation.validate(schema.search) , searchController.globalSearch);
router.post('/searchId' , searchController.searchbySearchID);

module.exports = router;