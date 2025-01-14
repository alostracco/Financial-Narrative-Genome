import React from "react";

const Login = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "300px",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      color: "white",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonDisabled: {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
    },
    footer: {
      marginTop: "10px",
      fontSize: "14px",
      textAlign: "center",
    },
    link: {
      color: "#007BFF",
      textDecoration: "none",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <div style={styles.title}>Login</div>
        <input type="email" placeholder="Email Address" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button type="submit" style={styles.button}>
          Login
        </button>
        <div style={styles.footer}>
          Don’t have an account?
          <a href="/signup" style={styles.link}>
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
