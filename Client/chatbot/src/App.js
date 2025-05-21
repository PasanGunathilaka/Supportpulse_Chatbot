import React from 'react';
import './App.css';
import ChatbotUI from './components/ChatbotUI.jsx';

function App() {
  return (
    <div className="App">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="logo">
            <div className="logo-circle"></div>
            <h1>SupportPulse</h1>
          </div>
          <p className="tagline">Your AI Support Assistant</p>
        </div>
        <ChatbotUI />
      </div>
    </div>
  );
}

export default App;
