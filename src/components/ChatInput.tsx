import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useMessageStore } from '../store/messageStore';
import { useAuthStore } from '../store/authStore';
import { getAIResponse } from '../services/ai';

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isAIChat, setIsAIChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addMessage = useMessageStore((state) => state.addMessage);
  const username = useAuthStore((state) => state.username);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !username) return;

    const userMessage = {
      text: message.trim(),
      sender: username,
      timestamp: new Date(),
      isAI: false,
    };

    addMessage(userMessage);
    setMessage('');

    if (isAIChat) {
      setIsLoading(true);
      try {
        const aiResponse = await getAIResponse(message);
        addMessage({
          text: aiResponse,
          sender: 'AI Assistant',
          timestamp: new Date(),
          isAI: true,
        });
      } catch (error) {
        console.error('Error getting AI response:', error);
        addMessage({
          text: 'Sorry, I encountered an error processing your request.',
          sender: 'AI Assistant',
          timestamp: new Date(),
          isAI: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="border-t border-gray-100 p-4 bg-white/50 rounded-b-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsAIChat(!isAIChat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isAIChat
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isAIChat ? '🤖 AI Mode' : '👥 Group Chat'}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isAIChat ? "Ask AI anything..." : "Type your message..."}
            className="flex-1 rounded-xl border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};