import React from "react";
import { useState } from "react";
import Login from "./Login";

const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
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
          <button style={styles.loginButton} onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button style={styles.signupButton}>Sign Up</button>
        </div>
      </nav>
      {showLogin && ( // Conditionally render the login modal
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button
              style={styles.closeButton}
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
    </>
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
