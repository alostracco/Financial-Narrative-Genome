import React from "react";

const About = () => {
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
      paddingTop: "2vh", // Moves content closer to the top
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", // Aligns content higher up
      alignItems: "center",
      textAlign: "center",
      color: "white",
    },
    content: {
      //maxWidth: "1500px",
      //background: "rgba(0, 0, 0, 0.7)",
      padding: "2rem",
      borderRadius: "10px",
      overflowX: "hidden",
      overflowY: "hidden",
    },
    heading1: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
      fontFamily: "'IBM Plex Mono', monospace",
    },
    heading2: {
      fontSize: "1.8rem",
      marginTop: "1.5rem",
      fontFamily: "'IBM Plex Mono', monospace",
    },
    paragraph: {
      fontSize: "1.2rem",
      lineHeight: "1.6",
      fontFamily: "'IBM Plex Mono', monospace",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      margin: "0.5rem 0",
    },
  };

  return (
    <div style={styles.hero}>
      <div style={styles.content}>
        <h1 style={styles.heading1}>
          About the Financial Narrative Genome Project
        </h1>
        <p style={styles.paragraph}>
          The Financial Narrative Genome Project is dedicated to extracting key
          themes and insights from financial texts using advanced NLP
          techniques. Our goal is to revolutionize how financial narratives are
          structured and analyzed.
        </p>

        <h2 style={styles.heading2}>Our Mission</h2>
        <p style={styles.paragraph}>
          We aim to provide structured and meaningful interpretations of
          financial documents by leveraging AI, machine learning, and natural
          language processing.
        </p>

        <h2 style={styles.heading2}>Technologies Used</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            💡 FinBERT - Financial Text Classification
          </li>
          <li style={styles.listItem}>
            📊 BERTopic - Topic Modeling & Theme Extraction
          </li>
          <li style={styles.listItem}>
            ⚡ React & Tailwind CSS - Frontend Development
          </li>
          <li style={styles.listItem}>
            🧠 Python & NLP Libraries - Backend Analysis
          </li>
        </ul>

        <h2 style={styles.heading2}>Meet the Team</h2>
        <p style={styles.paragraph}>
          We are a team of passionate developers, researchers, and financial
          analysts working together to bring this project to life.
        </p>
      </div>
    </div>
  );
};

export default About;
