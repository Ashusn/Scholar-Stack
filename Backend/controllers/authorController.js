const authordb = require("../models/author");

// Controller function to create a new author
const createAuthor = async (req, res) => {
  try {
    const newAuthor = await authordb.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating author" });
  }
};

// Controller function to get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await authordb.find();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching authors" });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
};
