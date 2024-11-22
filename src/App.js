import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Sentiment from './sentiment.js';  // Update to use the capitalized Sentiment component

function App() {
  return (
    <div className="App">
      <Sentiment />  {/* Use the capitalized Sentiment component */}
    </div>
  );
}

export default App;

