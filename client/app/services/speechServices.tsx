// frontend/src/services/speechService.tsx
import axios from "axios";

const API_URL = "http://localhost:5000/api/speech";

interface SpeechResponse {
  transcript: string;
  audio: string;
}

export const recognizeSpeech = async (audio: Blob): Promise<string> => {
  const response = await axios.post<SpeechResponse>(`${API_URL}/speech-to-text`, { audio });
  return response.data.transcript;
};

export const textToSpeech = async (text: string): Promise<string> => {
  const response = await axios.post<SpeechResponse>(`${API_URL}/text-to-speech`, { text });
  return response.data.audio;
};
