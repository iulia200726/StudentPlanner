import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.jsx";
import { useAuth } from "../AuthContext";
import "../style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          login();
          navigate("/dashboard");
        })
      .catch(() => {
        setError("Incorrect email or password. Please try again.");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="primary-btn">
            Log In
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="secondary-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
