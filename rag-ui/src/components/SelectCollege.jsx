import React, { useState } from "react";
import "./SelectCollege.css";
import { auth } from "../Auth/firebase";
import { saveGoogleStudent } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

function SelectCollege() {
  const [college, setCollege] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!college) {
      alert("Please select your college");
      return;
    }

    await saveGoogleStudent(auth.currentUser, college);
    navigate("/chat");
  };

  return (
    <div className="college-container">
      <div className="blur-effect"></div>

      <div className="college-card">
        <h2>Select Your College</h2>
        <p className="subtitle">
          Choose your institution to continue
        </p>

        <select
          className="college-select"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        >
          <option value="">Select College</option>
          <option value="pict">PICT</option>
          <option value="vit">VIT</option>
          <option value="coep">COEP</option>
        </select>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SelectCollege;