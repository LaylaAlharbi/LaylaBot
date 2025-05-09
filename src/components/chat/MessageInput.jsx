import { useState } from 'react';

export default function MessageInput({ value, onChange, onSend, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  let recognition;

  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleRecord = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
  
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
  
      // Set a timeout to stop recording after 4 seconds
      const timeoutId = setTimeout(() => {
        if (isRecording) {
          recognition.stop();
        }
      }, 4000);
  
      recognition.onresult = (event) => {
        clearTimeout(timeoutId); // Clear the timeout if we get results earlier
        const transcript = event.results[0][0].transcript;
        onChange(transcript);
        setIsRecording(false);
      };
  
      recognition.onerror = (event) => {
        clearTimeout(timeoutId); // Clear the timeout on error
        setIsRecording(false);
      };
  
      recognition.onend = () => {
        clearTimeout(timeoutId); // Clear the timeout when recording ends
        setIsRecording(false);
      };
    }
  };

  return (
    <div className="flex items-stretch shadow-sm rounded-xl overflow-hidden">
      <input
        type="text"
        className={`flex-1 border border-gray-200/60 dark:border-gray-600/50 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500/70 dark:placeholder-gray-400/70 transition-all ${
          disabled ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        placeholder="Type your message..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {/* Mic button with animation */}
      <button
        className={`relative px-4 focus:outline-none transition-all flex items-center justify-center border-t border-b border-gray-200/60 dark:border-gray-600/50 ${
          disabled ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        onClick={handleRecord}
        disabled={disabled}
        title={isRecording ? 'Stop Recording' : 'Record Audio'}
      >
        {/* Animated glow */}
        <span
          className={`absolute inset-0 rounded-full ${
            isRecording
              ? 'animate-ping bg-pink-500/20 dark:bg-pink-400/20'
              : ''
          }`}
        ></span>

        {/* Mic icon */}
        <span
          className={`relative z-10 rounded-full p-2 ${
            isRecording
              ? 'bg-pink-500 text-white animate-pulse shadow-lg'
              : 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600'
          } transition-all`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
            <path
              fillRule="evenodd"
              d="M5 10a5 5 0 0010 0h-2a3 3 0 11-6 0H5z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {/* Enhanced Send button */}
      <button
        className={`relative px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none transition-all flex items-center justify-center rounded-r-xl group ${
          disabled ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        onClick={onSend}
        disabled={disabled}
        title="Send Message"
      >
        {/* Hover effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-20 rounded-r-xl transition-opacity"></span>
        
        {/* Icon with animation */}
        <span className="relative z-10 transform group-hover:scale-110 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
// export default function MessageInput({ value, onChange, onSend, disabled }) {
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       onSend()
//     }
//   }

//   const handleChange = (e) => {
//     onChange(e.target.value)
//   }

//   return (
// <div className="flex items-stretch shadow-sm">
//   <input
//     type="text"
//     className={`flex-1 border border-gray-200/60 dark:border-gray-600/50 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500/70 dark:placeholder-gray-400/70 transition-all ${
//       disabled ? 'opacity-70 cursor-not-allowed' : ''
//     }`}
//     placeholder="Type your message..."
//     value={value}
//     onChange={handleChange}
//     onKeyDown={handleKeyDown}
//     disabled={disabled}
//   />
//   <button
//     className={`bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-0 rounded-r-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all flex items-center ${
//       disabled ? 'opacity-70 cursor-not-allowed' : ''
//     }`}
//     onClick={onSend}
//     disabled={disabled}
//   >
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       className="h-5 w-5" 
//       viewBox="0 0 20 20" 
//       fill="currentColor"
//     >
//       <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//     </svg>
//   </button>
// </div>
//   )
// }