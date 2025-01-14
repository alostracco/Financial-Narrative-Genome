import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Nav />
      <Hero />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

/*
function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Login />
    </div>
  );
}

export default App;
*/
