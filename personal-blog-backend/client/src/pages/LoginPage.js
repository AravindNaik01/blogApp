// client/src/pages/LoginPage.js

import React from "react";
import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:5000/api/auth/login",
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { username, password }
      );
localStorage.setItem('token',response.data.token)
navigate('/admin/dashboard')


      console.log("Login successful:", response.data);

    } catch (err) {
      // 7. If an error occurs (e.g., wrong credentials, server down)
      console.error("Login failed:", err);

      // Check if the error has a response from the server (like a 401 or 400 status)
      if (err.response && err.response.data && err.response.data.message) {
        // Use the specific error message from our backend
        setError(err.response.data.message);
      } else {
        // For network errors or other issues without a specific message
        setError("Login failed. Please try again.");
      }
    } finally {
      // 8. No matter what, set loading state back to false
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            className="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            disabled={loading}
          ></input>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
