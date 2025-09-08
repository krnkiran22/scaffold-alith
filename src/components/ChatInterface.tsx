import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

// Browser-compatible function that calls our local Alith server
const getAlithResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || 'No response received';
  } catch (error) {
    console.error('Error calling Alith server:', error);
    throw error;
  }
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Alith AI Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use Alith server for AI response
      const aiResponse = await getAlithResponse(currentInput);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response if AI fails
      const fallbackResponse: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 flex items-end justify-center sm:block p-4 sm:p-0">
      {/* Chat Modal */}
      <div className="relative bg-white shadow-2xl w-full max-w-md sm:w-[420px] h-full max-h-[90vh] sm:h-[600px] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden border border-gray-200">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 sm:p-6 flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Alith AI</h3>
              <p className="text-gray-300 text-xs sm:text-sm">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div id="messages-container" className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="space-y-3 sm:space-y-4">
            {/* Initial Bot Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-sm border border-gray-200 max-w-xs sm:max-w-md">
                <div className="mb-3 sm:mb-4">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Hello! I'm Alith AI Assistant</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    I'm here to provide intelligent assistance and guidance. How can I help you today?
                  </p>
                </div>

               

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <span className="text-base sm:text-lg">⚡</span>
                    <span className="font-semibold text-xs sm:text-sm">AI Spotlight</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-600 leading-relaxed">
                    I can help you with various tasks and provide intelligent assistance across multiple domains!
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Messages */}
            {messages.slice(1).map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gray-800 text-white border-0'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-200">
          {/* Input Field with Send Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-2 py-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg sm:rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Bottom Navigation */}

        </div>
      </div>
    </div>
  );
};

export default ChatInterface;