import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Graph from "./components/graph"; // Import the new Graph component
import "./loading.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulated loading delay
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="app-container">
          <Nav />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/graph/:ticker" element={<Graph />} /> {/* Add route for Graph page */}
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;