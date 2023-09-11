const express = require("express");
const router = express.Router();
const journalPaperController = require("../controllers/journalPAperController");

// Create a new journal paper
router.post("/journalPaper", journalPaperController.createJournalPaper);

// Get all journal papers
router.get("/journalPaper", journalPaperController.getAllJournalPapers);

// Get a specific journal paper by ID
router.get("/journalPaper/:id", journalPaperController.getJournalPaperById);

// Update a journal paper by ID
router.patch("/journalPaper/:id", journalPaperController.updateJournalPaper);

// Delete a journal paper by ID
router.delete("/journalPaper/:id", journalPaperController.deleteJournalPaper);
// Create a new journal paper
router.post("/upload", journalPaperController.uploadJournalPaper);

module.exports = router;
