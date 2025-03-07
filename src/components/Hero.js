import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const API_KEY = "kkY8dHH6PUvuS6QV9WYkuFrXY9yqSgQT";

  useEffect(() => {
    if (query.length > 1) {
      fetchCompanies();
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    // Prevent scrolling
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto"; // Restore scrolling on unmount
    };
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=20&apikey=${API_KEY}`
      );
      const filteredResults = response.data.filter((company) =>
        ["NASDAQ", "NYSE", "TSX", "TSXV"].includes(company.exchangeShortName)
      );
      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  return (
    <div style={styles.hero}>
      <h1 style={styles.title}>
        Unraveling Financial Narratives Over Time with AI.
      </h1>
      <p style={styles.subtitle}>
        Enter a company name to unveil historical summary and public sentiment
        using AI-driven analysis.
      </p>
      <div style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for a company to analyze..."
          style={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <ul style={styles.resultsList}>
          {results.map((company) => (
            <li key={company.symbol} style={styles.resultItem}>
              {company.name} ({company.symbol}) - {company.exchangeShortName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  hero: {
    fontFamily: "IBM Plex Mono",
    backgroundImage: "url('/BGImageHomePage.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
    width: "100vw",
    paddingTop: "10vh", // Moves content closer to the top
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Aligns content higher up
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    marginTop: "50px",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
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
  resultsList: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
    backgroundColor: "#1e293b",
    borderRadius: "5px",
    maxWidth: "500px",
    width: "100%",
    color: "white",
    textAlign: "left",
  },
  resultItem: {
    padding: "10px",
    borderBottom: "1px solid #374151",
    cursor: "pointer",
  },
};

export default Hero;
