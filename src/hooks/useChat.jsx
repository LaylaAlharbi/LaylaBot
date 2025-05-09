import { useState, useEffect, useCallback } from 'react';
import { sendMessageToAI } from '../services/openai';
import { toast } from 'react-toastify';

export function useChat() {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('chat-conversations');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('chat-conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('chat-conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Load messages for current conversation
  useEffect(() => {
    if (currentConversationId) {
      const conversation = conversations.find(c => c.id === currentConversationId);
      setMessages(conversation ? conversation.messages : []);
    } else {
      setMessages([]);
    }
  }, [currentConversationId, conversations]);

  const startNewConversation = useCallback(() => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: []
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newId);
    return newId;
  }, []);

  const sendMessage = useCallback(async (content, options = {}) => {
    if (!content.trim()) return;
  
    const userMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };
  
    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);
  
    try {
      const response = await sendMessageToAI(
        [...messages, userMessage],
        options
      );
  
      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
  
      setMessages(prev => [...prev, aiMessage]);
      return aiMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error);
      // Rollback optimistic update
      setMessages(prev => prev.filter(m => m.timestamp !== userMessage.timestamp));
      throw error;
    } finally {
      setLoading(false);
    }
  }, [messages]);
  
  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    messages,
    loading,
    error,
    sendMessage,
    startNewConversation
  };
}