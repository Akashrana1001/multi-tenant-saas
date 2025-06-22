import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/login.css";

import API from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  API.post("/api/auth/login", { email, password });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // store JWT
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home"); // redirect after login
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          required
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
      <p>
        <Link to="/forgot-password" style={{ color: "#1e88e5" }}>
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login;
