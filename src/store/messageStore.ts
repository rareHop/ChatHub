import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types';

// Create WebSocket connection
const ws = new WebSocket('ws://localhost:8080');

interface MessageState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id'>) => void;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (message) => {
        const newMessage = {
          ...message,
          id: Date.now().toString(),
        };
        
        // Send message through WebSocket
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            message: newMessage,
          }));
        }
      },
    }),
    {
      name: 'chat-messages',
    }
  )
);

// WebSocket event listeners
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'NEW_MESSAGE') {
    const currentMessages = useMessageStore.getState().messages;
    const newMessage = data.message;
    
    // Check if message already exists to avoid duplicates
    if (!currentMessages.some(msg => msg.id === newMessage.id)) {
      useMessageStore.setState({
        messages: [...currentMessages, newMessage],
      });
    }
  }
};

ws.onclose = () => {
  console.log('WebSocket connection closed. Attempting to reconnect...');
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};