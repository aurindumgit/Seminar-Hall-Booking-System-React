import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRequest.css";

const CreateRequest = () => {
  const navigate = useNavigate();
  const [requestName, setRequestName] = useState("");
  const [clubName, setClubName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [sName, setSName] = useState("");
  const [date, setDate] = useState(""); 
  const [req,setreq] = useState("");
   // Declare the state for date

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedInUserEmail = localStorage.getItem("userEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the logged-in user's data
    const userIndex = users.findIndex((user) => user.email === loggedInUserEmail);

    if (userIndex !== -1) {
      const newRequest = {
        request_name: requestName,
        club_name: clubName,
        purpose: purpose,
        S_Name: sName,
        date,
        status: "pending",
        req: req
      };


      users[userIndex].requests = users[userIndex].requests || [];
      users[userIndex].requests.push(newRequest);

      // Update localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Navigate back to the user dashboard
      navigate("/user-dashboard");
    } else {
      alert("User not found. Please log in again.");
    }
  };

  return (
    <div className="create-request">
      <h2 className="header">Create Request</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label className="label">Department Name:</label>
          <input
            type="text"
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Club Name:</label>
          <input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Purpose:</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Supervisor Name:</label>
          <input
            type="text"
            value={sName}
            onChange={(e) => setSName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Any Requirements/Special Arrangements:</label>
          <input
            type="text"
            value={req}
            onChange={(e) => setreq(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Date:</label>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateRequest;
