const mongoose = require("mongoose");

const citationSchema = new mongoose.Schema({
  citationID: {
    type: Number,
    required: false,
  },
  paperID: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    unique: true,
  },
  citedPaperID: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    unique: true,
  },
  citationDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("citationSchema", citationSchema);
