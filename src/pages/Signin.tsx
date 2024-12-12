import React, { useState } from "react";
import logo from "../images/signup/logo.png";

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={imageStyle}>
          <img style={imageStyle2} src={logo} alt="logo" />
        </div>
        <h1 style={appNameStyle}>Uvaro</h1>
        <h1 style={appNameStyle2}>Assess</h1>
        <p style={subTextStyle}>
          {isSignUp ? "Sign up to continue" : "Sign in to continue"}
        </p>

        {isSignUp && (
          <div>
            <input type="text" placeholder="First Name" style={inputStyle} />
            <input type="text" placeholder="Last Name" style={inputStyle} />
          </div>
        )}
        <input type="email" placeholder="Email" style={inputStyle} />

        <button style={primaryButtonStyle}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p style={footerTextStyle}>
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <button
            style={linkButtonStyle}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  boxSizing: "border-box",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  textAlign: "center",
};

const imageStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  paddingBottom: "20px",
};

const imageStyle2: React.CSSProperties = {
  width: "20%",
  height: "20%",
};

const appNameStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "40px",
  fontWeight: "bolder",
};

const appNameStyle2: React.CSSProperties = {
  textAlign: "center",
  fontSize: "40px",
  fontWeight: "bolder",
  marginTop: "-20px",
  marginBottom: "20px",
};

const subTextStyle: React.CSSProperties = {
  fontSize: "14px",
  marginBottom: "20px",
  color: "#666",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  boxSizing: "border-box",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
  marginTop: "15px",
};

const linkButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#d32f2f",
  cursor: "pointer",
  textDecoration: "underline",
  fontSize: "12px",
};

export default Signin;
