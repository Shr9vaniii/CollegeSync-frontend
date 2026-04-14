import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import {
  signupStudentEmail,
  signupAdmin,
  signupWithGoogle
} from "../Auth/AuthService";


function SignUp() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (role === "student") {
        if (!college) return alert("Please select college");
        await signupStudentEmail(email, password, college);
        navigate("/chat");
      } else {
        user= await signupAdmin(email, password);
        if(!user.emailVerified){
          navigate("/verify-email");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    const res = await signupWithGoogle();

    if (res.isNew) {
      navigate("/select-college");
    } else {
      if (res.data.role === "admin") navigate("/dashboard");
      else navigate("/chat");
    }
  };

  return (
    <div className="SignUp-container">
      <div className="blur-effect"></div>

      <h2>Sign Up</h2>

      <div className="SignUp-form">
        {/* Role */}
        <div className="role-toggle">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="SignUp-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="SignUp-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* College dropdown ONLY for student */}
        {role === "student" && (
          <select
            className="SignUp-select"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          >
            <option value="">Select College</option>
            <option value="pict">PICT</option>
            <option value="vit">VIT</option>
            <option value="coep">COEP</option>
          </select>
        )}

        {/* Admin hint */}
        {role === "admin" && (
          <p className="admin-hint">
            Use official college email (e.g. @college.edu)
          </p>
        )}

        {/* Signup button */}
        <button className="SignUp-button" onClick={handleSignup}>
          Sign Up
        </button>

        {/* Divider */}
        {role === "student" && <div className="divider">OR</div>}

        {/* Google */}
        {role === "student" && (
          <button className="google-btn" onClick={handleGoogle}>
            
            Continue with Google
          </button>
        )}
      </div>

      <h6>
        Already have an account?{" "}
        <Link to="/login">
          <u>Sign In</u>
        </Link>
      </h6>
    </div>
  );
}

export default SignUp;