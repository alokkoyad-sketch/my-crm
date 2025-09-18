// components/RoleEditor.js
"use client";

import { useState, useEffect } from "react";

/**
 * Props:
 * - roles: array
 * - onUpdate(newRoles)
 * - permissionsList: array
 */

export default function RoleEditor({ roles = [], onUpdate, permissionsList = [] }) {
  const [list, setList] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [name, setName] = useState("");
  const [perms, setPerms] = useState([]);

  useEffect(() => {
    setList(roles);
    if (roles.length) {
      setSelectedRoleId(roles[0].id);
      setName(roles[0].name);
      setPerms(roles[0].permissions || []);
    }
  }, [roles]);

  const pickRole = (id) => {
    const r = list.find((x) => x.id === id);
    setSelectedRoleId(id);
    setName(r?.name || "");
    setPerms(r?.permissions ? [...r.permissions] : []);
  };

  const togglePerm = (p) => {
    setPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const saveRole = () => {
    if (!name.trim()) return alert("Role name required");
    const id = selectedRoleId || name.toLowerCase().replace(/\s+/g, "-");
    const next = list.some((r) => r.id === id)
      ? list.map((r) => (r.id === id ? { ...r, name, permissions: perms } : r))
      : [{ id, name, permissions: perms }, ...list];
    setList(next);
    onUpdate && onUpdate(next);
    setSelectedRoleId(id);
    alert("Role saved");
  };

  const deleteRole = (id) => {
    if (!confirm("Delete role?")) return;
    const next = list.filter((r) => r.id !== id);
    setList(next);
    onUpdate && onUpdate(next);
    // reset selection
    if (next.length) pickRole(next[0].id);
    else { setSelectedRoleId(null); setName(""); setPerms([]); }
  };

  return (
    <div>
      <div className="mb-3">
        <div className="flex gap-2 mb-2">
          <select value={selectedRoleId || ""} onChange={(e) => pickRole(e.target.value)} className="border p-2 rounded flex-1">
            <option value="" disabled>Select role</option>
            {list.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <button onClick={() => { setSelectedRoleId(null); setName(""); setPerms([]); }} className="px-3 py-2 bg-gray-200 rounded">+ New</button>
          {selectedRoleId && <button onClick={() => deleteRole(selectedRoleId)} className="px-3 py-2 bg-red-500 text-white rounded">Delete</button>}
        </div>

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Role name" className="w-full border p-2 rounded mb-2" />
      </div>

      <div className="mb-3">
        <div className="text-sm font-medium mb-2">Permissions</div>
        <div className="max-h-40 overflow-auto border p-3 rounded">
          {permissionsList.map((p) => (
            <label key={p} className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={perms.includes(p)} onChange={() => togglePerm(p)} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button onClick={saveRole} className="bg-blue-600 text-white px-3 py-2 rounded">Save</button>
      </div>
    </div>
  );
}
