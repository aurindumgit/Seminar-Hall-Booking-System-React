import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  // Fetch all requests from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const allRequests = [];

    users.forEach((user) => {
      if (user.requests) {
        user.requests.forEach((request) => {
          allRequests.push({
            uName: user.u_name,  // Added user's name here
            email: user.email,
            requestName: request.request_name,
            clubName: request.club_name, // Corrected key name to match your JSON sample
            purpose: request.purpose,
            supervisor: request.S_Name,
            date: request.date,
            req: request.req,
            status: request.status,
          });
        });
      }
    });

    setRequests(allRequests);
  }, []);

  // Handle Accept/Reject actions
  const handleAction = (email, requestName, newStatus) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Update the status of the request in the users list
    users.forEach((user) => {
      if (user.email === email && user.requests) {
        const request = user.requests.find(
          (r) => r.request_name === requestName
        );
        if (request) {
          request.status = newStatus;
        }
      }
    });

    // Update localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Refresh requests in the dashboard
    const updatedRequests = requests.map((req) => {
      if (req.email === email && req.requestName === requestName) {
        return { ...req, status: newStatus };
      }
      return req;
    });

    setRequests(updatedRequests);
  };
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear();
      // Optionally reinitialize default admin data
      localStorage.setItem(
        "admin",
        JSON.stringify({ email: "admin@gmail.com", pass: "1234" })
      );
      setRequests([]); // Clear requests in the state
      alert("All data has been cleared!");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="header">Admin Dashboard</h1>
      <button className="clear-data-btn" onClick={handleClearData}>
        Clear All Data
      </button>
      <div className="admin-container">
        {requests.length === 0 ? (
          <p className="empty-text">No requests found.</p>
        ) : (
          requests.map((request, index) => (
            <div key={index} className="admin-card">
              <h3 className="subheader">{request.uName}'s Request</h3> {/* Displaying u_name */}
              <p className="text">User: {request.email}</p>
              <p className="text">Department: {request.requestName}</p>
              <p className="text">Club: {request.clubName}</p>
              <p className="text">Purpose: {request.purpose}</p>
              <p className="text">Supervisor: {request.supervisor}</p>
              <p className="text">Date: {request.date}</p>
              <p className="text">Requirements: {request.req}</p>
              <p className="text">Status: {request.status}</p>
              {request.status === "pending" && (
                <div className="actions">
                  <button
                    className="button accept-btn"
                    onClick={() =>
                      handleAction(request.email, request.requestName, "accepted")
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="button reject-btn"
                    onClick={() =>
                      handleAction(request.email, request.requestName, "rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
