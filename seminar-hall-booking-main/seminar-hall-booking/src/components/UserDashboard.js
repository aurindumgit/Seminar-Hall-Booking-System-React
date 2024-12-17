import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"

const UserDashboard = () => {
  const [userRequests, setUserRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem("userEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === loggedInUserEmail);

    if (user) {
      setUserRequests(user.requests || []);
    } else {
      alert("User not found. Redirecting to login.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
  <h1 className="header">Hi, {localStorage.getItem("userEmail")}</h1>
  <div className="dashboard-container">
    {userRequests.length === 0 ? (
      <p className="empty-text">No requests found. Create one below!</p>
    ) : (
      userRequests.map((request, index) => (
        <div key={index} className="card">
          <h3 className="subheader">{request.request_name}</h3>
          <p className="text">Status: {request.status}</p>
          <p className="text">Date: {request.date}</p>
        </div>
      ))
    )}
  </div>
  <button onClick={() => navigate("/create-request")}>
    Create Request
  </button>
</div>

  );
};

export default UserDashboard;
