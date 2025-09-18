"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

const roles = ["Admin", "Manager", "Team Leader", "Agent", "Tracker", "Packer"];
const orderStatuses = [
  "Call Not Pick",
  "Call Cut",
  "Bluedart",
  "Post Office",
  "In Process",
  "Cancel",
  "Confirm",
];

export default function OrderPageStatus() {
  const [permissions, setPermissions] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const toggleStatus = (status) => {
    setPermissions((prev) => {
      const current = prev[selectedRole] || [];
      if (current.includes(status)) {
        return { ...prev, [selectedRole]: current.filter((s) => s !== status) };
      } else {
        return { ...prev, [selectedRole]: [...current, status] };
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">⚙️ Order Page Status</h1>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-900">
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role} className="border-t hover:bg-gray-50">
              <td className="p-3 text-gray-800">{role}</td>
              <td className="p-3">
                <button
                  onClick={() => handleEdit(role)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Statuses for {selectedRole}
            </h2>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {orderStatuses.map((status) => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions[selectedRole]?.includes(status) || false}
                    onChange={() => toggleStatus(status)}
                  />
                  <span className="text-gray-900">{status}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
