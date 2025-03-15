const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

const connectDB = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const parentRoutes = require("./src/routes/parentRoutes.js");
const childRoutes = require("./src/routes/childRoutes.js");
const doctorRoutes = require("./src/routes/doctorRoutes.js");
const therapySessionRoutes = require("./src/routes/therapySessionRoutes.js");
const userAuthRoutes = require("./src/routes/userAuthRoutes.js");
const predictionRoutes = require("./src/routes/prediction");
const speechRoutes = require("./src/routes/speechRoutes.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/predict", predictionRoutes);  // Use prediction route

app.use('/api/speech', speechRoutes);


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

// Route to get the prediction from the ML model
app.post("/predict", async (req, res) => {
  try {
      const response = await axios.post("http://localhost:5000/predict", {
          features: req.body.features,  // Send feature array
      });

      res.json({ prediction: response.data.prediction });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(process.env.DATABASE_URL);
  console.log(`Server is running on http://localhost:${port}`);
});
