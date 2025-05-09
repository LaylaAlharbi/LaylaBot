import { useState, useRef, useEffect } from 'react'
import { chatWithAI } from '../../services/openai'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatInterface() {

  const apiKey = localStorage.getItem("openai_api_key")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can I assist you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    try {
      const aiResponse = await chatWithAI(apiKey, [...messages, userMessage])
      const aiMessage = {
        id: Date.now(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      let errorText = 'Sorry, I encountered an error. Please try again.'
      if (error.message.includes('Please set your OpenAI API key')) {
        errorText = error.message
      }
      const errorMessage = {
        id: Date.now(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-gray-900/30 dark:to-gray-800/30 ">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none shadow-sm max-w-xs lg:max-w-md border border-white/50 dark:border-gray-600/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 dark:bg-indigo-300 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-pink-400 dark:bg-pink-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <MessageInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}


