// src/components/transcription/ProgressIndicator.jsx
export default function ProgressIndicator({ isLoading }) {
    if (!isLoading) return null;
  
    return (
    <div className="flex flex-col items-center justify-center space-y-3 py-6">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-blue-500"></div>
      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Transcribing audio...</p>
    </div>

    );
  }