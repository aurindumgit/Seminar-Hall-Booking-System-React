import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateRequest from "./components/CreateRequest";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard
import usersData from "./data/users.json";
import adminData from "./data/admin.json";

const App = () => {
  useEffect(() => {
    // Initialize users and admin data in localStorage if not already set
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(usersData));
    }
    if (!localStorage.getItem("admin")) {
      localStorage.setItem("admin", JSON.stringify(adminData));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* AdminDashboard Route */}
      </Routes>
    </Router>
  );
};

export default App;
