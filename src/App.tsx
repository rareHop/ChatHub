import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useAuthStore } from './store/authStore';
import { useMessageStore } from './store/messageStore';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoginForm } from './components/LoginForm';

function App() {
  const { isAuthenticated, username, logout } = useAuthStore();
  const messages = useMessageStore((state) => state.messages);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">
            <div className="text-center">
              <div className="relative inline-block">
                <MessageSquare className="h-16 w-16 text-blue-500" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to ChatHub
              </h2>
              <p className="mt-2 text-gray-600">Sign in to join the conversation</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChatHub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {username}
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col">
              {[...messages].reverse().map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
          </div>
          <ChatInput />
        </div>
      </main>
    </div>
  );
}

export default App;