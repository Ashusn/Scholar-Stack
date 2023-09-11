const express = require("express");
const router = express.Router();
const citationController = require("../controllers/citationController");

// Create a new citation
router.post("/citationPaper", citationController.createCitation);

// Get all citations
router.get("/citationPaper", citationController.getAllCitations);

module.exports = router;
