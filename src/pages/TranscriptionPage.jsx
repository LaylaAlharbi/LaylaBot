import { useState } from 'react';
import { useTranscription } from '../hooks/useTranscription';
import AudioUpload from '../components/transcription/AudioUpload';
import ProgressIndicator from '../components/transcription/ProgressIndicator';
import TranscriptionViewer from '../components/transcription/TranscriptionViewer';
import Lottie from 'lottie-react';
import animationAudio from '../assets/Animation-audio3.json';

export default function TranscriptionPage() {
  const {
    transcription,
    isLoading,
    error,
    history,
    transcribe,
    clearTranscription
  } = useTranscription();

  const handleFileUpload = async (file) => {
    try {
      await transcribe(file);
    } catch (err) {
      console.error('Transcription error:', err);
    }
  };

  const handleHistorySelect = (item) => {
    clearTranscription();
    setTimeout(() => {
      const selectedItem = history.find(h => h.id === item.id);
      if (selectedItem) {
        transcribe(new File([], selectedItem.filename)).then(() => {});
      }
    }, 100);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 md:w-40 md:h-40"> {/* Adjusted size */}
          <Lottie 
            animationData={animationAudio} 
            loop={true} 
            autoplay={true}
            className="w-full h-full" 
          />
        </div>
        
        <h1 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mt-2">
          Audio Transcription
        </h1>
        <p className="text-center text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Upload an audio file (MP3, WAV, M4A) to transcribe it to text
        </p>
      </div>
  
      <AudioUpload 
        onFileUpload={handleFileUpload} 
        isLoading={isLoading} 
      />
      
      <ProgressIndicator isLoading={isLoading} />
      
      <TranscriptionViewer
        transcription={transcription}
        error={error}
        onClear={clearTranscription}
        history={history}
        onHistorySelect={handleHistorySelect}
      />
    </div>
  );
}