const express = require('express');
const router = express.Router();

const create = require('./create');
const search = require('./search');

router.use('/books', create);
router.use('/books', search);

module.exports = router;