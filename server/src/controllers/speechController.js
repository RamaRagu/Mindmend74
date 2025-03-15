const OpenAI = require("openai");
const fs = require("fs");
const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: process.env.AZURE_OPENAI_ENDPOINT,
  defaultQuery: { "api-version": "2024-02-01" },
});

//  GPT-4o API Route
exports,processText = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: process.env.AZURE_GPT4_DEPLOYMENT,
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Whisper (Speech-to-Text) API Route
const upload = multer({ dest: "uploads/" });
exports.processSpeech = async (req, res) => {
  try {
    const audioFile = fs.createReadStream(req.file.path);

    const response = await openai.audio.transcriptions.create({
      model: process.env.AZURE_WHISPER_DEPLOYMENT,
      file: audioFile,
    });

    res.json({ transcript: response.text });

    // Clean up file
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  TTS (Text-to-Speech) API Route
exports.textToSpeech = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.audio.speech.create({
      model: process.env.AZURE_TTS_DEPLOYMENT,
      input: text,
      voice: "alloy",
    });

    const filePath = `tts_output_${Date.now()}.mp3`;
    fs.writeFileSync(filePath, response.data);

    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
