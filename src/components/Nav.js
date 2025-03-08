import React, { useState } from "react";
import Login from "./Login";

const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.logo}>Financial Narrative Genome</div>
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
            <button
              style={styles.loginButton}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button style={styles.signupButton}>Sign Up</button>
          </div>
        </div>
      </nav>
      {showLogin && (
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
    backgroundColor: "#0a192f",
    padding: "1rem 2rem",
    color: "white",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "IBM Plex Mono",
  },
  links: {
    display: "flex",
    gap: "1rem",
    fontFamily: "IBM Plex Mono",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    //margintop: "50px",
    fontFamily: "IBM Plex Mono",
  },
  loginButton: {
    color: "#3c8dbc",
    background: "none",
    border: "1px solid #3c8dbc",
    color: "#3c8dbc",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontFamily: "IBM Plex Mono",
    hover: "blue",
  },

  signupButton: {
    background: "#3c8dbc",
    border: "none",
    color: "white",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontFamily: "IBM Plex Mono",
    hover: "dark blue",
  },
};

export default Nav;
