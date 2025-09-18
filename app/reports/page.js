// src/pages/Reports.jsx
import React from "react";

const reports = [
  { name: "Sales Report", date: "2025-09-15", type: "Sales" },
  { name: "Courier Report", date: "2025-09-14", type: "Courier" },
  { name: "Export Report", date: "2025-09-13", type: "Export" },
];

export default function Reports() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">Reports</h2>
      <div className="flex gap-3 mb-4">
        <input
          type="date"
          className="border p-2 rounded text-black"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">Filter</button>
      </div>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-black text-left">Report Name</th>
            <th className="p-2 text-black text-left">Date</th>
            <th className="p-2 text-black text-left">Type</th>
            <th className="p-2 text-black text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 text-black">{r.name}</td>
              <td className="p-2 text-black">{r.date}</td>
              <td className="p-2 text-black">{r.type}</td>
              <td className="p-2 text-black">
                <button className="px-3 py-1 bg-green-500 text-white rounded">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
