const citationdb = require("../models/citation");

// Controller function to create a new citation
const createCitation = async (req, res) => {
  try {
    const newCitation = await citationdb.create(req.body);
    res.status(201).json(newCitation);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating citation" });
  }
};

// Controller function to get all citations
const getAllCitations = async (req, res) => {
  try {
    const citations = await citationdb.find();
    res.status(200).json(citations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching citations" });
  }
};

module.exports = {
  createCitation,
  getAllCitations,
};
