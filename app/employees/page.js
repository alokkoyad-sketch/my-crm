"use client";
import React, { useEffect, useState } from "react";
import EmployeeForm from "../../components/EmployeeForm";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  async function fetchUsers() {
    const res = await fetch("/api/employees");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users || []);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleCreate(payload) {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      await fetchUsers();
      setShowForm(false);
    } else {
      const data = await res.json();
      alert(data.message || "Create failed");
    }
  }

  async function handleUpdate(id, payload) {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      await fetchUsers();
      setEditing(null);
    } else {
      const data = await res.json();
      alert(data.message || "Update failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete user?")) return;
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchUsers();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Employees</h2>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          Create Employee
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-black text-left">Username</th>
            <th className="p-2 text-black text-left">Role</th>
            <th className="p-2 text-black text-left">Permissions</th>
            <th className="p-2 text-black text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2 text-black">{u.username}</td>
              <td className="p-2 text-black">{u.role}</td>
              <td className="p-2 text-black">{(u.permissions || []).join(", ") || "-"}</td>
              <td className="p-2 text-black">
                <button
                  onClick={() => { setEditing(u); setShowForm(true); }}
                  className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <EmployeeForm
              initial={editing}
              onCancel={() => { setShowForm(false); setEditing(null); }}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

