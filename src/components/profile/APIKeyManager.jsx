import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Lottie from 'lottie-react'
import animationSetting from '../../assets/AnimationSetting2.json'

export default function APIKeyManager() {
  const { apiKey, saveApiKey, removeApiKey } = useApp()
  const [inputKey, setInputKey] = useState('')
  const [status, setStatus] = useState({ message: '', isError: false })

  const handleSave = () => {
    if (!inputKey.trim()) {
      setStatus({ message: 'API key cannot be empty', isError: true })
      return
    }
    if (!inputKey.startsWith('sk-')) {
      setStatus({ message: 'Invalid API key format', isError: true })
      return
    }
    saveApiKey(inputKey)
    setInputKey('')
    setStatus({ message: 'API key saved successfully', isError: false })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-gray-900/30 dark:to-gray-800/30 p-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Animation */}
        <div className="w-48 h-48 md:w-36 md:h-36 mb-2 transform hover:scale-105 transition-transform duration-300">
          <Lottie 
            animationData={animationSetting} 
            loop={true} 
            autoplay={true}
            className="w-full h-full"
          />
        </div>

        {/* Card Container */}
        <div className="w-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/50">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300 mb-6">
              API Key Management
            </h2>

            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/70 dark:border-gray-600/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="sk-********************************"
                />
              </div>
              <p className="text-xs text-gray-500/80 dark:text-gray-400/80 mt-2">
                Your key is stored securely in your browser's local storage
              </p>
            </div>

            {/* Status Message */}
            {status.message && (
              <div className={`mb-6 p-3 rounded-lg ${
                status.isError 
                  ? 'bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-300' 
                  : 'bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-300'
              }`}>
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                Save Key
              </button>
              {apiKey && (
                <button
                  onClick={removeApiKey}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                  Remove Key
                </button>
              )}
            </div>

            {/* Current Key Display */}
            {apiKey && (
              <div className="p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Key:</p>
                <div className="flex items-center">
                  <span className="text-xs font-mono bg-gray-200/70 dark:bg-gray-600/50 px-2 py-1 rounded">
                    {apiKey.substring(0, 5)}...{apiKey.substring(apiKey.length - 4)}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    (partially hidden for security)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}