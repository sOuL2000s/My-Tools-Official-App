// client/src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css'; // For chatbot-specific styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // For auto-scrolling

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const MODEL_NAME = 'gemini-2.5-flash-preview-05-20'; // The model you specified

  // Refs for the Generative AI components to persist across renders
  const genAI = useRef(null);
  const generativeModel = useRef(null);
  const chatSession = useRef(null);

  // Initialize Generative AI model and start chat session once on mount
  useEffect(() => {
    if (!GEMINI_API_KEY) {
        console.error("Gemini API Key is not set in environment variables. Chatbot will not function.");
        setMessages([{ role: 'model', text: 'Error: Gemini API Key not found. Please check your .env.local file.' }]);
        return;
    }

    try {
      genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
      generativeModel.current = genAI.current.getGenerativeModel({ model: MODEL_NAME });
      // Start a chat session to maintain conversation history automatically
      chatSession.current = generativeModel.current.startChat({
        history: [], // Starts with an empty history, sendMessage will update it
        generationConfig: {
            maxOutputTokens: 1000, // Limit response length
        },
      });
      setMessages([{ role: 'model', text: 'Hello! I am your AI assistant. How can I help you today?' }]);
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error);
      setMessages([{ role: 'model', text: 'Error initializing AI. Check console for details.' }]);
    }
  }, [GEMINI_API_KEY]); // Dependency on API key, runs only once if key is stable

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]); // Scroll when messages or loading state changes

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to UI
    setInput(''); // Clear input field
    setLoading(true); // Indicate loading state

    if (!chatSession.current) {
        console.error("Chat session not initialized.");
        setMessages((prevMessages) => [...prevMessages, { role: 'model', text: 'Error: Chatbot not ready. Please try refreshing.' }]);
        setLoading(false);
        return;
    }

    try {
      // Send the user's message to the Gemini API
      const result = await chatSession.current.sendMessage(userMessage.text);
      const responseText = await result.response.text(); // Get the plain text response

      const modelMessage = { role: 'model', text: responseText };
      setMessages((prevMessages) => [...prevMessages, modelMessage]); // Add bot's response to UI
    } catch (error) {
      console.error('Error sending message to Gemini API:', error);
      setMessages((prevMessages) => [...prevMessages, { role: 'model', text: 'Oops! Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>AI Chatbot</h2>
        <p className="powered-by">Powered by Gemini ({MODEL_NAME})</p>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
        {loading && (
            <div className="message-bubble model thinking">
                <strong>Bot:</strong> Thinking...
            </div>
        )}
        <div ref={messagesEndRef} /> {/* Element to scroll to */}
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={GEMINI_API_KEY ? "Ask me anything..." : "Chatbot not available (API key missing)"}
          disabled={loading || !GEMINI_API_KEY}
        />
        <button type="submit" disabled={loading || !GEMINI_API_KEY}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;