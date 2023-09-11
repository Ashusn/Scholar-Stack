const JournalPaper = require("../models/journalPapers");

const getAllJournalPapers = async (req, res) => {
  try {
    const commonItems = await JournalPaper.find();
    res.status(200).json(commonItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJournalPaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await JournalPaper.findById(id);

    if (!journal || !journal.pdfData) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Set the response headers for PDF download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${journal.pdfName}"` // Fixed the field name to pdfName
    );
    res.setHeader("Content-Type", "application/pdf");

    // Send the PDF data as the response
    res.send(journal.pdfData);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ message: "Error downloading PDF" });
  }
};

const createJournalPaper = async (req, res) => {
  try {
    const commonItem = await JournalPaper.create(req.body);
    console.log(req.body);
    res.status(201).json(commonItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateJournalPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const commonItem = await JournalPaper.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!commonItem) {
      return res
        .status(404)
        .json({ message: `Cannot find any item with ID ${id}` });
    }
    res.status(200).json(commonItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJournalPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const commonItem = await JournalPaper.findByIdAndDelete(id);
    if (!commonItem) {
      return res
        .status(404)
        .json({ message: `Cannot find any item with ID ${id}` });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadJournalPaper = async (req, res) => {
  try {
    const { journalName, authorID, paperID, issOrDoi, datePublished } =
      req.body;

    // Create a new JournalPaper instance with the uploaded data
    const commonItem = new JournalPaper({
      journalName,
      authorID,
      paperID,
      issOrDoi,
      datePublished,
      pdfName: req.file.originalname,
      pdfData: req.file.buffer,
    });

    // Save the journal paper to the database
    await commonItem.save();

    // Send a success response
    res.status(201).json({ message: "Item uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading item." });
  }
};

module.exports = {
  getAllJournalPapers,
  getJournalPaperById,
  createJournalPaper,
  updateJournalPaper,
  deleteJournalPaper,
  uploadJournalPaper,
};
