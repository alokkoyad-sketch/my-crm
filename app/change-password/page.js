"use client";

import React, { useState } from "react";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setTimeout(() => {
      if (form.oldPassword === "123456") {
        setMessage("Password changed successfully!");
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setError("Old password is incorrect.");
      }
    }, 800);
  };

  return (
    <div className="p-6 max-w-md bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-black mb-1">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg shadow"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
