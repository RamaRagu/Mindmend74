const express = require("express");
const multer = require("multer");
const { processSpeech, textToSpeech } = require("../controllers/speechController.js");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/speech-to-text', upload.single('audio'), processSpeech); // Expecting a file field named 'audio'
router.post('/text-to-speech', textToSpeech);

module.exports = router;
