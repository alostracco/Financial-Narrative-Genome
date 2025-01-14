import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Stock Sentiment Analysis</div>
      <div style={styles.links}>
        <a href="/" style={styles.link}>
          Home
        </a>
        <a href="/dashboard" style={styles.link}>
          Dashboard
        </a>
        <a href="/about" style={styles.link}>
          About Us
        </a>
        <button style={styles.loginButton}>Login</button>
        <button style={styles.signupButton}>Sign Up</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0a192f",
    padding: "1rem 2rem",
    color: "white",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  loginButton: {
    background: "none",
    border: "1px solid #3c8dbc",
    color: "#3c8dbc",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  signupButton: {
    background: "#3c8dbc",
    border: "none",
    color: "white",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};

export default Nav;
