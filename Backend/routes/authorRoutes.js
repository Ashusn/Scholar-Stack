const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// Create a new author
router.post("/authorInfo", authorController.createAuthor);

// Get all authors
router.get("/authorInfo", authorController.getAllAuthors);

module.exports = router;
