import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your Accessibility Assistant. How can I help you navigate our site today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(history, userMsg.text);
      
      const modelMsg: ChatMessage = { role: 'model', text: responseText || "I didn't quite catch that." };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble responding right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 left-5 z-50 bg-secondary text-dark font-bold py-3 px-6 rounded-full shadow-lg border-2 border-dark hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        <span className="text-2xl">🤖</span>
        <span className="hidden sm:inline">AI Helper</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-5 w-[90vw] sm:w-96 h-[500px] max-h-[80vh] bg-white border-4 border-primary rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">AccessiWeb Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-secondary text-2xl font-bold"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-bg-gray">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-dark border-2 border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                 <div className="bg-white text-dark border-2 border-gray-200 p-3 rounded-lg rounded-bl-none italic">
                   Thinking...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t-2 border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about accessibility..."
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white p-3 rounded-lg font-bold hover:bg-blue-800 disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
