import { useState } from 'react';
import { toast } from 'react-toastify';

export function useTranscription() {
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const validateAudioFile = (file) => {
    if (!file) {
      throw new Error('No audio file selected');
    }

    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/webm'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Unsupported file format. Please upload MP3, WAV, M4A, or WEBM');
    }

    if (file.size > 25 * 1024 * 1024) { // 25MB limit
      throw new Error('File too large. Maximum size is 25MB');
    }
  };

  const getApiKey = () => {
    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      throw new Error('API key not found. Please set your OpenAI API key in settings.');
    }
    return apiKey;
  };

  const handleApiError = (error) => {
    console.error('Transcription error:', error);
    let userMessage = 'Transcription failed';

    if (error.message.includes('Incorrect API key')) {
      userMessage = 'Invalid API key. Please update your OpenAI API key in settings.';
    } else if (error.message.includes('quota')) {
      userMessage = 'API quota exceeded. Please check your OpenAI account usage.';
    } else if (error.message.includes('file format')) {
      userMessage = error.message;
    } else {
      userMessage = error.message || userMessage;
    }

    setError(userMessage);
    toast.error(userMessage);
    throw error;
  };

  const transcribe = async (audioFile) => {
    try {
      // Validate inputs
      validateAudioFile(audioFile);
      const apiKey = getApiKey();
      
      setIsLoading(true);
      setError(null);

      // Prepare request
      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', 'whisper-1');

      // Make API call
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        body: formData
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const result = await response.json();
      const newTranscription = result.text;

      // Update state
      setTranscription(newTranscription);
      setHistory(prev => [{
        id: Date.now() + Math.random().toString(36).substr(2, 9), // Unique ID
        filename: audioFile.name,
        text: newTranscription.length > 100 
          ? `${newTranscription.substring(0, 100)}...` 
          : newTranscription,
        fullText: newTranscription,
        date: new Date().toISOString()
      }, ...prev.slice(0, 9)]); // Keep only last 10 items

      return newTranscription;
    } catch (err) {
      return handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearTranscription = () => {
    setTranscription('');
    setError(null);
  };

  return {
    transcription,
    isLoading,
    error,
    history,
    transcribe,
    clearTranscription
  };
}