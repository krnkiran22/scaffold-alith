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

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI therapy assistant. How can I help you today?",
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

    // Simulate AI response with mock data
    setTimeout(() => {
      const mockResponses = [
        "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
        "That sounds challenging. What coping strategies have you tried before?",
        "I understand. It's completely normal to feel that way. Would you like to explore some mindfulness techniques?",
        "Your feelings are valid. Let's work through this together. What would be most helpful for you right now?",
        "I'm here to support you. Can you describe what's been weighing on your mind lately?"
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Modal */}
      <div className="relative bg-white shadow-2xl w-[420px] h-[600px] flex flex-col rounded-2xl overflow-hidden border border-gray-200">
        {/* Chat Header */}
        <div className="bg-gray-800 p-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z M21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H11V21H5V3H13V9H21Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Alith AI</h3>
              <p className="text-gray-300 text-sm">AI Assistant</p>
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
        <div id="messages-container" className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-6">
            {/* Initial Bot Message with Avatar */}
            <div className="flex justify-start items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                </svg>
              </div>
              <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-200 max-w-sm">
                <p className="text-gray-800 text-sm mb-3">
                  <span className="font-semibold text-gray-800">Hello! I'm Alith AI Assistant</span><br />
                  I'm here to provide intelligent assistance and guidance. How can I help you today?
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Choose one of these options or type your question below:
                </p>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <span>💡</span>
                    <span>General Help</span>
                  </button>
                  <button className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <span>📅</span>
                    <span>Schedule</span>
                  </button>
                  <button className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Features</span>
                  </button>
                  <button className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <span>🔧</span>
                    <span>Support</span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <span>⚡</span>
                    <span className="font-semibold text-sm">AI Spotlight</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    I can help you with various tasks and provide intelligent assistance across multiple domains!
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Messages */}
            {messages.slice(1).map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start items-start space-x-3'}`}>
                {message.sender === 'bot' && (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-sm px-5 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gray-800 text-white border-0'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                  </svg>
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-200">
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
        <div className="p-6 bg-white border-t border-gray-200">
          {/* Input Field with Send Button */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-2 py-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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