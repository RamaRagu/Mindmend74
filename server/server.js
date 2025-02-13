const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const parentRoutes = require(".server/src/routes/parentRoutes.js");
const childRoutes = require("./routes/childRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const therapySessionRoutes = require("./routes/therapySessionRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the parent and child routes
app.use("/api/parents", parentRoutes);
app.use("/api/children", childRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/therapy-sessions", therapySessionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
