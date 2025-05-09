// src/components/transcription/AudioUpload.jsx
import { useCallback, useState } from 'react';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function AudioUpload({ onFileUpload, isLoading }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const audioFile = e.dataTransfer.files[0];
      if (validateFile(audioFile)) {
        setFile(audioFile);
      }
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const audioFile = e.target.files[0];
      if (validateFile(audioFile)) {
        setFile(audioFile);
      }
    }
  };

  const validateFile = (file) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/x-m4a'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload an MP3, WAV, or M4A file');
      return false;
    }
    if (file.size > 25 * 1024 * 1024) { // 25MB limit
      alert('File size must be less than 25MB');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* <div className="flex flex-col items-center justify-center space-y-2">
          <ArrowUpTrayIcon className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag & drop an audio file here, or click to browse
          </p>
          <input
            type="file"
            id="audio-upload"
            accept="audio/mpeg,audio/wav,audio/m4a"
            className="hidden"
            onChange={handleChange}
          />
          <label
            htmlFor="audio-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Select File
          </label>
        </div> */}
<div
  className={`flex flex-col items-center justify-center space-y-4 p-8 rounded-2xl transition border-2 border-dashed ${
    dragActive
      ? 'border-blue-500 bg-blue-50 dark:bg-gray-800'
      : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
  } hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800`}
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
>
  <p className="text-center text-sm text-gray-700 dark:text-gray-300 max-w-xs">
    Drag & drop an audio file here, or click below
  </p>
  <input
    type="file"
    id="audio-upload"
    accept="audio/mpeg,audio/wav,audio/m4a"
    className="hidden"
    onChange={handleChange}
  />
  <label
    htmlFor="audio-upload"
    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 transition cursor-pointer"
  >
    Select File
  </label>
</div>
      </div>

      {file && (
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="font-medium truncate max-w-xs">{file.name}</span>
            <span className="text-sm text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
          <button
            onClick={removeFile}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || isLoading}
        className={`w-full py-2 px-4 rounded-md ${
          !file || isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? 'Processing...' : 'Transcribe Audio'}
      </button>
    </div>
  );
}