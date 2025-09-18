// src/pages/Product.jsx
import React from "react";

const products = [
  { name: "MaleExtra", category: "Supplement", price: 1590, status: "Active" },
  { name: "Thor Booster", category: "Supplement", price: 1690, status: "Active" },
];

export default function Product() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">Products</h2>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-black text-left">Product Name</th>
            <th className="p-2 text-black text-left">Category</th>
            <th className="p-2 text-black text-left">Price</th>
            <th className="p-2 text-black text-left">Status</th>
            <th className="p-2 text-black text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 text-black">{p.name}</td>
              <td className="p-2 text-black">{p.category}</td>
              <td className="p-2 text-black">₹{p.price}</td>
              <td className="p-2 text-black">
                <button className={`px-3 py-1 rounded ${p.status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                  {p.status}
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
