const express = require("express");
const router = express.Router();

const validation = require("../../middleware/validator.js");
const schema = require("../../middleware/joiSchema.js");

const searchController = require("./searchController.js");

router.get("/allbook", searchController.allBook); // to get all books
router.get(
  "/allbook/fuzzysearch",
  validation.validate(schema.fuzzySearch),
  searchController.fuzzySearch
); // to get all books by book name
router.post(
  "/globalsearch",
  validation.validate(schema.globalSearch),
  searchController.globalSearch
); // global search using regex
router.post(
  "/globalfuzzysearch",
  validation.validate(schema.globalSearch),
  searchController.globalfuzzysearch
); // global search using fuzzy

router.post(
  "/select",
  validation.validate(schema.select),
  searchController.select
);

module.exports = router;
