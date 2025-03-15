const express = require("express");
const { processSpeech, textToSpeech } = require("../controllers/speechController.js");
const router = express.Router();

router.post('/speech-to-text', processSpeech);
router.post('/text-to-speech', textToSpeech);

module.exports = router;
