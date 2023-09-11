const mongoose = require("mongoose");

const paperSchema = mongoose.Schema(
  {
    journalName: {
      type: String,
      required: true,
    },
    authorID: {
      type: String,
    },
    paperID: {
      type: String,
    },
    issOrDoi: {
      type: String,
    },
    type: {
      type: String,
      default: "Scopus",
    },
    datePublished: {
      type: Date,
    },
    // Add additional fields common to both PDF and journal papers
    pdfName: String,
    pdfData: Buffer,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Paper", paperSchema);
