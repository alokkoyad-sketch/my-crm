// src/pages/Domain.jsx
import React from "react";

const domains = [
  { company: "VS Group of Enterprises", product: "MaleExtra", status: "Active" },
  { company: "VS Group of Enterprises", product: "Thor Booster", status: "Active" },
];

export default function Domain() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">Domains</h2>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-black text-left">Company</th>
            <th className="p-2 text-black text-left">Product Name</th>
            <th className="p-2 text-black text-left">Status</th>
            <th className="p-2 text-black text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((d, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 text-black">{d.company}</td>
              <td className="p-2 text-black">{d.product}</td>
              <td className="p-2 text-black">
                <button className={`px-3 py-1 rounded ${d.status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                  {d.status}
                </button>
              </td>
              <td className="p-2 text-black">
                <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
