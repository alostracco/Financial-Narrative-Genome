import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Hero = () => {
  const [query, setQuery] = useState(""); // Stores user input
  const [results, setResults] = useState([]); // Stores API results
  const API_KEY = "kkY8dHH6PUvuS6QV9WYkuFrXY9yqSgQT"; // Your FMP API Key

  // Fetch company names when user types
  useEffect(() => {
    if (query.length > 1) {
      fetchCompanies();
    } else {
      setResults([]); // Clear results if query is empty
    }
  }, [query]);

  // Fetch company names from Financial Modeling Prep API
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=20&apikey=${API_KEY}`
      );

      // Filter to only US (NASDAQ, NYSE) and Canadian (TSX, TSXV) stocks
      const filteredResults = response.data.filter(
        (company) =>
          company.exchangeShortName === "NASDAQ" ||
          company.exchangeShortName === "NYSE" ||
          company.exchangeShortName === "TSX" ||
          company.exchangeShortName === "TSXV"
      );

      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Show search results */}
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

// Styles
const styles = {
  hero: {
    fontFamily: "IBM Plex Mono",
    backgroundImage: `url('/BGImageHomePage.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    padding: "80px 20px",
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
