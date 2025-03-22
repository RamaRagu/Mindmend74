const OpenAI = require("openai");
const fs = require("fs");
const multer = require("multer");

const dotenv = require("dotenv");
const { OpenAIClient } = require("@azure/openai");
const { AzureKeyCredential } = require("@azure/core-auth");
dotenv.config();

const openai = new OpenAI.OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: "https://mindmend-openai.openai.azure.com/",
});

// Welcome message for speech therapy
exports.getWelcomeNote = async (req, res) => {
  try {
    const welcomeText = "Welcome to your speech therapy session. We'll help you practice reading word by word. Let's begin with our e-book.";
    
    const response = await openai.audio.speech.create({
      model: process.env.AZURE_TTS_DEPLOYMENT,
      input: welcomeText,
      voice: "alloy",
    });

    const filePath = `welcome_message_${Date.now()}.mp3`;
    fs.writeFileSync(filePath, response.data);

    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get e-book content
exports.getEbookContent = async (req, res) => {
  try {
    const { ebookId } = req.params;
    // Mock function - replace with actual database query
    const ebookContent = await fetchEbookFromDatabase(ebookId);
    
    res.json({ content: ebookContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Process individual word for TTS
exports.processWordToSpeech = async (req, res) => {
  try {
    const { word } = req.body;

    const response = await openai.audio.speech.create({
      model: process.env.AZURE_TTS_DEPLOYMENT,
      input: word,
      voice: "alloy",
    });

    const filePath = `word_${Date.now()}.mp3`;
    fs.writeFileSync(filePath, response.data);

    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify spoken word with STS
exports.verifySpeechWord = async (req, res) => {
  try {
    const audioBuffer = req.body.audio;
    const expectedWord = req.body.expectedWord;

    if (!Buffer.isBuffer(audioBuffer)) {
      throw new Error("The provided audio is not a valid buffer");
    }

    const response = await openai.audio.transcriptions.create({
      model: "whisper",
      audio: audioBuffer,
      fileType: "m4a",
    });
    
    // Check if the spoken word matches the expected word
    const transcribedText = response.text.toLowerCase().trim();
    const isCorrect = transcribedText === expectedWord.toLowerCase().trim();
    
    res.json({ 
      transcript: response.text,
      expected: expectedWord,
      isCorrect: isCorrect
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mock function - replace with actual implementation
async function fetchEbookFromDatabase(ebookId) {
  // This should be replaced with actual database query
  const mockBooks = {
    "1": "Once upon a time there was a little girl who loved to read books.",
    "2": "The quick brown fox jumps over the lazy dog."
  };
  
  return mockBooks[ebookId] || "No content found for this book.";
}

// Keep the original functions
exports.processText = async (req, res) => {
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

exports.processSpeech = async (req, res) => {
  try {
    const audioBuffer = req.body.audio;

    if (!Buffer.isBuffer(audioBuffer)) {
      throw new Error("The provided audio is not a valid buffer");
    }

    const response = await openai.audio.transcriptions.create({
      model: "whisper",
      audio: audioBuffer,
      fileType: "m4a",
    });

    if (!response || !response.text) {
      throw new Error("Failed to connect to the AI model or invalid response received");
    }
    
    console.log(response);

    res.json({ transcript: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
