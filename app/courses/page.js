"use client";

import { useState } from "react";

export default function CouriersPage() {
  const [couriers, setCouriers] = useState([
    {
      id: 1,
      name: "MaleExtra (1 Month)",
      courierPrice: 1590,
      indiaPostPrice: 1590,
      tax: "5%",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "MaleExtra (2 Month)",
      courierPrice: 1990,
      indiaPostPrice: 1690,
      tax: "5%",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Thor Booster (1 Month)",
      courierPrice: 1390,
      indiaPostPrice: 1390,
      tax: "5%",
      status: "ACTIVE",
    },
    {
      id: 4,
      name: "Thor Booster (2 Month)",
      courierPrice: 1690,
      indiaPostPrice: 1690,
      tax: "5%",
      status: "ACTIVE",
    },
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white"> Courses
</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Courier Price</th>
              <th className="p-3 border">IndiaPost Price</th>
              <th className="p-3 border">Tax</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((c, idx) => (
              <tr key={c.id} className="hover:black">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border">{c.name}</td>
                <td className="p-3 border">₹{c.courierPrice}</td>
                <td className="p-3 border">₹{c.indiaPostPrice}</td>
                <td className="p-3 border">{c.tax}</td>
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
