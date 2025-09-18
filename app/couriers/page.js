"use client";

import { useState } from "react";

export default function CouriersPage() {
  const [couriers, setCouriers] = useState([
    { id: 1, name: "Shiprocket", status: "ACTIVE" },
    { id: 2, name: "Delhivery", status: "ACTIVE" },
    { id: 3, name: "Bluedart", status: "INACTIVE" },
    { id: 4, name: "DTDC", status: "ACTIVE" },
    { id: 5, name: "XpressBees", status: "INACTIVE" },
    { id: 6, name: "Ecom Express", status: "ACTIVE" },
    { id: 7, name: "India Post", status: "ACTIVE" },
  ]);

  // toggle active/inactive
  const toggleStatus = (id) => {
    setCouriers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : c
      )
    );
  };

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold">🚚 Courier Companies</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Courier Name</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((c, idx) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border">{c.name}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      c.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => toggleStatus(c.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
