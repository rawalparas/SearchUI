const express = require('express');
const router = express.Router();

const search = require('./search');
const create = require('./create');

router.use('/books', search);
router.use('/books', create);

module.exports = router;