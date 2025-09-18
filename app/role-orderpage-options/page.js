"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

const roles = ["Admin", "Manager", "Team Leader", "Agent", "Tracker", "Packer"];
const pageOptions = [
  "Status Filter",
  "Order Filter",
  "Date Filter",
  "Agent Filter",
  "Domain Filter",
  "Product Filter",
  "Course Filter",
];

export default function OrderPageOptions() {
  const [permissions, setPermissions] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const toggleOption = (option) => {
    setPermissions((prev) => {
      const current = prev[selectedRole] || [];
      if (current.includes(option)) {
        return { ...prev, [selectedRole]: current.filter((s) => s !== option) };
      } else {
        return { ...prev, [selectedRole]: [...current, option] };
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">⚙️ Order Page Options</h1>

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
              Edit Options for {selectedRole}
            </h2>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pageOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions[selectedRole]?.includes(opt) || false}
                    onChange={() => toggleOption(opt)}
                  />
                  <span className="text-gray-900">{opt}</span>
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
