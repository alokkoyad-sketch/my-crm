// components/EmployeeForm.js
"use client";
import { useState } from "react";

const allPermissions = [
  "view-orders",
  "update-orders",
  "delete-orders",
  "export-data",
  "view-reports",
  "manage-products",
  "manage-couriers",
  "creat-orders",
  "Update-Orders",
  "Creat-users",
  "creat-course",
  "Assign-Orders",
  "Return-ORDERS",
  "Reset-password",
  "ship-orders",
  "view-inventory",
  "update-inventory",
  "view-customers",
  "manage-roles",
  "view-employees",
  "manage-employees",
  "view-roles",
  "view-permissions",
  "manage-permissions",
  "view-settings",
  "update-settings",
  "manage-logs",
  "view-dashboard",
  "view-analytics",
  "manage-analytics",
  "view-notifications",
  "manage-notifications",
  "view-messages",
  "manage-messages",
];


export default function EmployeeForm({ initial, onCancel, onCreate, onUpdate }) {
  const [form, setForm] = useState(
    initial || { username: "", password: "", role: "", permissions: [] }
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      permissions: checked
        ? [...(prev.permissions || []), value]
        : (prev.permissions || []).filter((p) => p !== value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (initial) {
      onUpdate(initial.id, form);
    } else {
      onCreate(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="TeamLeader">Team Leader</option>
          <option value="Agent">Agent</option>
          <option value="Tracker">Tracker</option>
          <option value="Packer">Packer</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Permissions</label>
        <div className="grid grid-cols-2 gap-2 border p-2 rounded">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={perm}
                checked={form.permissions?.includes(perm)}
                onChange={handleCheckboxChange}
              />
              {perm}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-3 py-1 bg-gray-400 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          {initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
