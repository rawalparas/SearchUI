const express = require('express');
const router = express.Router();

const searchController = require('./searchController.js'); 

router.get('/searchbook' , searchController.searchBook);
router.post('/searchdata', searchController.searchData);

module.exports = router;