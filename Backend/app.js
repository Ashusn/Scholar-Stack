const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
const upload = multer();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a common schema for PDF documents and journal papers
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

var citationschema = new mongoose.Schema({
  citationID: {
    type: Number,
    required: false,
  },
  paperID: {
    type: mongoose.Schema.Types.Mixed, // Allow both numbers and strings
    required: true,
    unique: true,
  },
  citedPaperID: {
    type: mongoose.Schema.Types.Mixed, // Allow both numbers and strings
    required: true,
    unique: true,
  },
  citationDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

var authorschema = new mongoose.Schema({
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

const authordb = mongoose.model("authorschema", authorschema);

const citationdb = mongoose.model("citationschema", citationschema);

const JournalPaper = mongoose.model("Paper", paperSchema);

// CRUD operations for common schema (PDF and journal papers)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/journalPaper", async (req, res) => {
  try {
    const commonItems = await JournalPaper.find();
    res.status(200).json(commonItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/journalPaper/:id", async (req, res) => {
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
});

app.post("/journalPaper", async (req, res) => {
  try {
    const commonItem = await JournalPaper.create(req.body);
    console.log(req.body);
    res.status(201).json(commonItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/citationPaper", async (req, res) => {
  try {
    const citations = await citationdb.find();
    res.status(200).json(citations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching citations" });
  }
});

// POST route to create a new citation
app.post("/citationPaper", async (req, res) => {
  try {
    const newCitation = await citationdb.create(req.body);
    res.status(201).json(newCitation);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating citation" });
  }
});

app.get("/authorInfo", async (req, res) => {
  try {
    const citations = await authordb.find();
    res.status(200).json(citations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching citations" });
  }
});

// POST route to create a new citation
app.post("/authorInfo", async (req, res) => {
  try {
    const newCitation = await authordb.create(req.body);
    res.status(201).json(newCitation);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating citation" });
  }
});

app.patch("/journalPaper/:id", async (req, res) => {
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
});

app.delete("/journalPaper/:id", async (req, res) => {
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
});

// PDF upload route
app.post("/upload", upload.single("pdfFile"), async (req, res) => {
  try {
    // const originalname = fs.read(`./public/pdf/${}`)
    const commonItem = new JournalPaper({
      journalName: req.body.journalName,
      authorID: req.body.authorID,
      paperID: req.body.paperID,
      issOrDoi: req.body.issOrDoi,
      datePublished: req.body.datePublished,
      pdfName: req.file.originalname,
      pdfData: req.file.buffer, // Assign the binary data from the uploaded file
    });

    await commonItem.save();
    res.status(201).send("Item uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading item.");
  }
});

mongoose.set("strictQuery", false);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
