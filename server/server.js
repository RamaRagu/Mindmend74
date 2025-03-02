const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const parentRoutes = require("./src/routes/parentRoutes.js");
const childRoutes = require("./src/routes/childRoutes.js");
const doctorRoutes = require("./src/routes/doctorRoutes.js");
const therapySessionRoutes = require("./src/routes/therapySessionRoutes.js");
const userAuthRoutes = require("./src/routes/userAuthRoutes.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors());

// Connect to MongoDB
// connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("MindMend API is running");
});

app.get("/ip", (request, response) => response.send(request.ip));

app.get("/headers", (request, response) => response.send(request.headers));

// Use the parent and child routes
app.use("/api/auth", userAuthRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/child", childRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/therapy-session", therapySessionRoutes);

// Start the server
app.listen(port, () => {
  console.log(process.env.DATABASE_URL);
  console.log(`Server is running on http://localhost:${port}`);
});
