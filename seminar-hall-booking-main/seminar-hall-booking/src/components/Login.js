import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check admin credentials
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (email === adminData.email && password === adminData.pass) {
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      return;
    }

    // Check user credentials
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.pass === password
    );

    if (user) {
      // Store logged-in user's email
      localStorage.setItem("userEmail", email);
      navigate("/user-dashboard");
    } else {
      alert("Invalid credentials. Please try again or register.");
      navigate("/register");
    }
  };

  return (
    <div className="login-container">
      <h1 className="header">Login</h1>
      <div className="login-form">
        <input
        className="input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        className="input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
