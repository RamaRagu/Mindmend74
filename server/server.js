const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config");
const cors = require("cors");

const app = express();
const port = 3000;

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
