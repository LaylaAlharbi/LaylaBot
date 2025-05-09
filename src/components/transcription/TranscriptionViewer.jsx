// src/components/transcription/TranscriptionViewer.jsx
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

export default function TranscriptionViewer({ 
  transcription, 
  error, 
  onClear,
  history,
  onHistorySelect 
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    toast.success('Copied to clipboard!');
  };

  return (

    <div className="space-y-6">
  {error && (
    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 shadow">
      <p className="font-semibold">Error:</p>
      <p>{error}</p>
    </div>
  )}

  {transcription && (
    <div className="border rounded-2xl overflow-hidden shadow-sm dark:border-gray-700">
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Transcription</h3>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            title="Copy to clipboard"
          >
            <ClipboardDocumentIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onClear}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="p-4 text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed font-mono text-sm">
        {transcription.split(' ').map((word, index) => (
          <span key={index} style={{ animation: `fadeIn 0.05s linear ${index * 0.03}s forwards`, opacity: 0 }} className="inline-block mr-1">
            {word}
          </span>
        ))}
      </div>
    </div>
  )}

  {history.length > 0 && (
    <div className="border rounded-2xl shadow-sm dark:border-gray-700">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 font-semibold text-gray-800 dark:text-gray-200">
        History
      </div>
      <div className="divide-y dark:divide-gray-700">
        {history.map((item) => (
          <div 
            key={item.id} 
            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
            onClick={() => onHistorySelect(item)}
          >
            <div className="flex justify-between">
              <span className="font-medium truncate text-gray-800 dark:text-gray-200">{item.filename}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.date).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
    
  );
}