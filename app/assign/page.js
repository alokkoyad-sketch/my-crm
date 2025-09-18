"use client";
import { useState } from "react";

export default function TrackPage() {
  const [leads, setLeads] = useState([
    { id: 1, name: "Ravi Kumar", product: "Course A", status: "Untouched" },
    { id: 2, name: "Amit Sharma", product: "Course B", status: "Call Back" },
    { id: 3, name: "Neha Verma", product: "Course A", status: "In Process" },
  ]);

  const [selectedLeads, setSelectedLeads] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);

  // toggle lead selection
  const toggleLead = (id, type) => {
    if (type === "left") {
      setSelectedLeads((prev) =>
        prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
      );
    } else {
      setSelectedAssigned((prev) =>
        prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
      );
    }
  };

  // select all from left
  const selectAllLeads = () => {
    setSelectedLeads(leads.map((l) => l.id));
  };

  // assign
  const assignLeads = () => {
    const toAssign = leads.filter((l) => selectedLeads.includes(l.id));
    setAssigned((prev) => [...prev, ...toAssign]);
    setLeads((prev) => prev.filter((l) => !selectedLeads.includes(l.id)));
    setSelectedLeads([]);
  };

  // unassign
  const unassignLeads = () => {
    const toUnassign = assigned.filter((l) => selectedAssigned.includes(l.id));
    setLeads((prev) => [...prev, ...toUnassign]);
    setAssigned((prev) => prev.filter((l) => !selectedAssigned.includes(l.id)));
    setSelectedAssigned([]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Assign Leads</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - Assign From */}
        <div className="bg-gray-900 shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Assign From</h2>
          {/* Filters */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <select className="bg-gray-800 border rounded p-2 text-sm">
              <option>Product</option>
              <option>Course A</option>
              <option>Course B</option>
            </select>
            <select className="bg-gray-800 border rounded p-2 text-sm">
              <option>Agent</option>
              <option>Agent A</option>
              <option>Agent B</option>
            </select>
            <select className="bg-gray-800 border rounded p-2 text-sm">
              <option>Status</option>
              <option>Untouched</option>
              <option>In Process</option>
              <option>Call Back</option>
            </select>
          </div>

          <button
            onClick={selectAllLeads}
            className="bg-blue-600 text-white px-3 py-1 rounded mb-3 text-sm"
          >
            Select All
          </button>

          {/* Leads List */}
          <ul className="space-y-2">
            {leads.map((lead) => (
              <li
                key={lead.id}
                className={`p-2 border rounded cursor-pointer ${
                  selectedLeads.includes(lead.id)
                    ? "bg-blue-700 border-blue-400"
                    : "bg-gray-800 border-gray-600"
                }`}
                onClick={() => toggleLead(lead.id, "left")}
              >
                <p className="font-medium">{lead.name}</p>
                <p className="text-xs text-gray-300">
                  {lead.product} - {lead.status}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle - Buttons */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={assignLeads}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            ➡️ Assign
          </button>
          <button
            onClick={unassignLeads}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            ⬅️ Unassign
          </button>
        </div>

        {/* Right Side - Assign To */}
        <div className="bg-gray-900 shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Assign To</h2>
          {/* Filters */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <select className="bg-gray-800 border rounded p-2 text-sm">
              <option>Product</option>
              <option>Course A</option>
              <option>Course B</option>
            </select>
            <select className="bg-gray-800 border rounded p-2 text-sm">
              <option>Agent</option>
              <option>Agent A</option>
              <option>Agent B</option>
            </select>
            <select className="bg-gray-800 border rounded p-2 text-sm">
              <option>Status</option>
              <option>Untouched</option>
              <option>In Process</option>
              <option>Call Back</option>
            </select>
          </div>

          {/* Assigned Leads */}
          <ul className="space-y-2">
            {assigned.map((lead) => (
              <li
                key={lead.id}
                className={`p-2 border rounded cursor-pointer ${
                  selectedAssigned.includes(lead.id)
                    ? "bg-yellow-700 border-yellow-400"
                    : "bg-gray-800 border-gray-600"
                }`}
                onClick={() => toggleLead(lead.id, "right")}
              >
                <p className="font-medium">{lead.name}</p>
                <p className="text-xs text-gray-300">
                  {lead.product} - {lead.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
