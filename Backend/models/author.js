// models/author.js
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  authorID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  paperName: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  publishedThrough: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("authorSchema", authorSchema);
