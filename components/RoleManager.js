"use client";

import { useState } from "react";

const PERMISSIONS_GROUPS = {
  "User Management": [
    "Create Employee",
    "Edit Employee",
    "Delete Employee",
    "Force Logout Employee",
  ],
  "Orders": [
    "View Orders",
    "Update Orders",
    "Cancel Orders",
    "Assign Orders",
  ],
  "Reports": ["View Reports", "Export Reports"],
  "Products": ["Add Products", "Edit Products", "Delete Products"],
  "Couriers": ["Assign Courier", "Update Courier Status"],
  "Domains / Courses": ["Manage Domains", "Manage Courses"],
  "Logs": ["View Export Logs", "Clear Logs"],
};

export default function RoleManager() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: Object.values(PERMISSIONS_GROUPS).flat(), // sab allow
    },
    {
      id: 2,
      name: "Manager",
      permissions: [
        "View Orders",
        "Update Orders",
        "Cancel Orders",
        "Assign Orders",
        "View Reports",
        "Export Reports",
        "Create Employee",
        "Edit Employee",
      ],
    },
    {
      id: 3,
      name: "Employee",
      permissions: ["View Orders", "Update Orders"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const togglePermission = (perm) => {
    setEditingRole((prev) => {
      const hasPerm = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: hasPerm
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  const handleSave = () => {
    if (!editingRole.name.trim()) {
      alert("Role name required");
      return;
    }

    if (editingRole.id) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? editingRole : r))
      );
    } else {
      setRoles((prev) => [
        ...prev,
        { ...editingRole, id: Date.now() },
      ]);
    }
    setShowModal(false);
    setEditingRole(null);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this role?")) {
      setRoles((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Role Management</h2>
        <button
          onClick={() => {
            setEditingRole({ id: null, name: "", permissions: [] });
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded font-bold"
        >
          + Add Role
        </button>
      </div>

      {/* Role List Table */}
      <table className="w-full border-2 border-black text-black font-semibold">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-black">
            <th className="p-2 border-r-2 border-black">Role</th>
            <th className="p-2 border-r-2 border-black">Permissions</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b border-black">
              <td className="p-2 border-r-2 border-black">{role.name}</td>
              <td className="p-2 border-r-2 border-black text-sm">
                {role.permissions.join(", ")}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => {
                    setEditingRole(role);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto text-black font-semibold border-2 border-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {editingRole.id ? "Edit Role" : "Add Role"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingRole(null);
                }}
                className="text-black font-bold"
              >
                ✖
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Role Name</label>
              <input
                value={editingRole.name}
                onChange={(e) =>
                  setEditingRole((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full border-2 border-black p-2 rounded text-black font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(PERMISSIONS_GROUPS).map(([group, perms]) => (
                <div
                  key={group}
                  className="border-2 border-black p-3 rounded text-sm"
                >
                  <h3 className="font-bold mb-2">{group}</h3>
                  {perms.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center gap-2 mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={editingRole.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="border-2 border-black"
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded font-bold"
              >
                SAVE
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingRole(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded font-bold"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
