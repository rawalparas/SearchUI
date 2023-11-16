const express = require("express");
const router = express.Router();

const validation = require("../../middleware/validator.js");
const schema = require("../../middleware/joiSchema.js");

const searchController = require("./searchController.js");

router.get("/search", searchController.search);
router.post("/globalsearch", validation.validate(schema.globalSearch), searchController.globalSearch); // global search using regex
router.post("/globalfuzzysearch", validation.validate(schema.globalFuzzySearch), searchController.globalFuzzySearch); // global search using fuzzy
router.post("/select", validation.validate(schema.select), searchController.select);

module.exports = router;
