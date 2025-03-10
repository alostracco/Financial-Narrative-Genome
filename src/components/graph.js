import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the ticker from the URL
import axios from "axios";
import Plot from "react-plotly.js";

const Graph = () => {
  const { ticker } = useParams(); // Get the ticker from the URL
  const [graphData, setGraphData] = useState(null); // State to store graph data
  const [summary, setSummary] = useState(null); // State to store summary text
  const [narrativeGraphData, setNarrativeGraphData] = useState(null); // State to store narrative graph data

  useEffect(() => {
    // Fetch data for the selected ticker
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/ticker", {
          ticker: ticker,
        });
        console.log("Ticker data received:", response.data);

        // Set the graph data
        if (response.data.graph) {
          setGraphData(JSON.parse(response.data.graph));
        }

        // Set the summary text if available
        if (response.data.summary) {
          setSummary(response.data.summary);
        }

        // Set the narrative graph data if available
        if (response.data.narrative_graph) {
          setNarrativeGraphData(JSON.parse(response.data.narrative_graph));
        }
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };

    fetchData();
  }, [ticker]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Financial Analysis for {ticker}</h1>
      {/* Render the graph if graphData is available */}
      {graphData && (
        <div style={styles.graphContainer}>
          <Plot
            data={graphData.data}
            layout={graphData.layout}
            config={{ displayModeBar: false }}
          />
        </div>
      )}
      {/* Render the summary if available */}
      {summary && (
        <div style={styles.summaryContainer}>
          <h2>Amazon Summary</h2>
          <pre style={styles.summaryText}>{summary}</pre>
        </div>
      )}
      {/* Render the narrative graph if available */}
      {narrativeGraphData && (
        <div style={styles.graphContainer}>
          <Plot
            data={narrativeGraphData.data}
            layout={narrativeGraphData.layout}
            config={{ displayModeBar: false }}
          />
        </div>
      )}
    </div>
  );
};

// Styles for the Graph page
const styles = {
  container: {
    backgroundColor: "black",
    fontFamily: "IBM Plex Mono",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "white",
  },
  graphContainer: {
    width: "80%",
    margin: "20px auto",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
  },
  summaryContainer: {
    width: "80%",
    margin: "20px auto",
    backgroundColor: "#1e293b",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    textAlign: "left",
  },
  summaryText: {
    whiteSpace: "pre-wrap", // Preserve formatting of the text
    fontFamily: "monospace",
  },
};

export default Graph;