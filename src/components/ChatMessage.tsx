import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { UserCircle2, Bot } from 'lucide-react';
import { Message } from '../types';
import { useAuthStore } from '../store/authStore';

interface ChatMessageProps extends Message {}

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender, timestamp, isAI }) => {
  const currentUser = useAuthStore(state => state.username);
  const isCurrentUser = sender === currentUser;

  return (
    <div className="p-4 hover:bg-white/50 transition-colors">
      <div className={`flex items-start space-x-4 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className="flex-shrink-0">
          {isAI ? (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className={`w-10 h-10 ${
              isCurrentUser 
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
            } rounded-xl flex items-center justify-center shadow-lg`}>
              <UserCircle2 className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        <div className={`flex-1 min-w-0 space-y-1 ${isCurrentUser ? 'text-right' : ''}`}>
          <div className={`flex items-center space-x-2 ${isCurrentUser ? 'justify-end' : ''}`}>
            <p className="font-semibold text-gray-900">{sender}</p>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </span>
          </div>
          <div className={`inline-block max-w-[80%] ${
            isCurrentUser 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-800'
          } rounded-2xl px-4 py-2 shadow-sm`}>
            <p className="leading-relaxed break-words">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};