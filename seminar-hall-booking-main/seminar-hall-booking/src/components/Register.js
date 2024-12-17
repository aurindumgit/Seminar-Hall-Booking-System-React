import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setUname] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if(email==="" || password==="" || uname===""){
        alert("Please fill in all fields.");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { u_name: uname, email, pass: password, requests: [] };

    // Add new user and update localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Redirecting to login.");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <div className="register-form">
      <input
        type="text"
        placeholder="Enter your name"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
      />
        <input
        
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
