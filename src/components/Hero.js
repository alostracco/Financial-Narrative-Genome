import React from "react";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div style={styles.hero}>
      <h1 style={styles.title}>Analyze Stock Sentiments in Real-Time.</h1>
      <p style={styles.subtitle}>
        Enter a company name to unveil market trends and public sentiment using
        advanced AI-driven analysis.
      </p>
      <div style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for a company to analyze..."
          style={styles.searchInput}
        />
      </div>
    </div>
  );
};

const styles = {
  hero: {
    fontfamily: "IBM Plex Mono",
    backgroundImage: `public\BGImageHomePage.jpg`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "2rem",
    maxWidth: "600px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: "5px",
    padding: "0.5rem",
    maxWidth: "500px",
    width: "100%",
  },
  searchIcon: {
    color: "#9ca3af",
    marginLeft: "0.5rem",
  },
  searchInput: {
    border: "none",
    background: "none",
    color: "white",
    flex: 1,
    padding: "0.5rem",
    fontSize: "1rem",
    outline: "none",
  },
};

export default Hero;
