const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const config = require("./config/config"); // Import the configuration

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().single("pdfFile"));

// Import and use your routes
const journalPaperRoutes = require("./routes/journalPaperRoutes");
const citationRoutes = require("./routes/citationRoutes");
const authorRoutes = require("./routes/authorRoutes");

app.use("/", journalPaperRoutes);
app.use("/", citationRoutes);
app.use("/", authorRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
