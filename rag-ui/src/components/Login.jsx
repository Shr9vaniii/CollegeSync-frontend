import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../Auth/Log-in";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginWithEmail(email, password);

      // 🔁 Role-based redirect
      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/chat");
      }

    } catch (err) {
      alert(err.message); // will show "verify email" also
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await loginWithGoogle();

      // 🆕 New user
      if (res.isNew) {
        navigate("/select-college");
        return;
      }

      // 🔁 Existing user redirect
      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/chat");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="Login-container">
      <div className="blur-effect1"></div>

      <h2>Sign In</h2>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="Login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          className="Login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button className="Login-button" onClick={handleLogin}>
          Sign In
        </button>
      </div>

      {/* 🔥 Divider */}
      <div className="divider">OR</div>

      {/* 🔥 Google Login */}
      <button className="google-btn" onClick={handleGoogle}>
        Continue with Google
      </button>

      <h6>
        Don't have an account?{" "}
        <Link to="/signup">
          <u>Sign Up</u>
        </Link>
      </h6>
    </div>
  );
}

export default Login;