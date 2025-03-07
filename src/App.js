import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";

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
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="app-container">
          <Nav />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;
