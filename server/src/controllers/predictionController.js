const axios = require("axios");

const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000";

exports.getPrediction = async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Flask API:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
