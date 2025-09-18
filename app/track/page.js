"use client";
import { useState } from "react";

export default function TrackOrder() {
  const [orders] = useState([
    {
      id: "ME389043",
      name: "Ravi Kumar",
      mobile: "9814076130",
      product: "MaleExtra",
      course: "1 Month",
      orderDate: "16-Sep-2025 10:38 AM",
      lastAgent: "Satendra",
      teamLeader: "Lucifer",
      lastTeamLeader: "N/A",
      dispatchDate: "-",
      status: "UNTOUCHED",
    },
  ]);

  const [search, setSearch] = useState({
    name: "",
    orderId: "",
    mobile: "",
    tracking: "",
  });

  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    const result = orders.filter(
      (o) =>
        (search.name && o.name.toLowerCase().includes(search.name.toLowerCase())) ||
        (search.orderId && o.id.toLowerCase().includes(search.orderId.toLowerCase())) ||
        (search.mobile && o.mobile.includes(search.mobile)) ||
        (search.tracking && o.id.toLowerCase().includes(search.tracking.toLowerCase()))
    );
    setSearchResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      {/* Header */}
      <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <h1 className="text-xl font-semibold">Track Order</h1>
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
          🔄
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow p-4 grid grid-cols-4 gap-4 border-x border-b rounded-b-lg">
        <input
          type="text"
          placeholder="Name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Order ID"
          value={search.orderId}
          onChange={(e) => setSearch({ ...search, orderId: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={search.mobile}
          onChange={(e) => setSearch({ ...search, mobile: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Tracking ID"
          value={search.tracking}
          onChange={(e) => setSearch({ ...search, tracking: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {/* Search Button */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Orders Table */}
      {searchResult.length > 0 ? (
        <div className="bg-white shadow p-4 border mt-4 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2">Order No.</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Mobile No.</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Order Date</th>
                <th className="border p-2">Last Agent</th>
                <th className="border p-2">Team Leader</th>
                <th className="border p-2">Last Team Leader</th>
                <th className="border p-2">Date of Dispatch</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.name}</td>
                  <td className="border p-2">{order.mobile}</td>
                  <td className="border p-2">{order.product}</td>
                  <td className="border p-2">{order.course}</td>
                  <td className="border p-2">{order.orderDate}</td>
                  <td className="border p-2">{order.lastAgent}</td>
                  <td className="border p-2">{order.teamLeader}</td>
                  <td className="border p-2">{order.lastTeamLeader}</td>
                  <td className="border p-2">{order.dispatchDate}</td>
                  <td className="border p-2 font-bold">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 text-gray-500 text-center">No results yet. Search by Name, Order ID, Mobile, or Tracking ID.</div>
      )}
    </div>
  );
}
