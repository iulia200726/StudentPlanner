import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "../style/Account.css";

function Account() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const reauthenticate = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("No user is currently signed in");
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await reauthenticate();
      await updatePassword(auth.currentUser, newPassword);
      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError("Failed to update password. Please check your current password and try again.");
    }
  };

  const handleDeleteAccount = async () => {
    setMessage("");
    setError("");
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      await reauthenticate();
      await deleteUser(auth.currentUser);
      navigate("/signup");
    } catch (err) {
      setError("Failed to delete account. Please check your current password and try again.");
    }
  };

  return (
    <div className="account-page">
      <h1>Account Settings</h1>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleChangePassword} className="password-form">
        <label>
          Current Password
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </label>

        <button type="submit" className="primary-btn">Change Password</button>
      </form>

      <hr />

      <button onClick={handleDeleteAccount} className="delete-btn">
        Delete Account
      </button>
    </div>
  );
}

export default Account;
