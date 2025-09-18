"use client";

import OrdersChart from "../components/OrdersChart";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white-900">📊 Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { label: "Received Orders", value: 0 },
          { label: "Confirmed Orders", value: 0 },
          { label: "Canceled Orders", value: 0 },
          { label: "Completed Orders", value: 0 },
          { label: "Delivered Orders", value: 0 },
          { label: "Undelivered Orders", value: 0 },
          { label: "Shiprocket Orders", value: 0 },
          { label: "Bluedart Orders", value: 0 },
          { label: "Indiapost Orders", value: 1 },
          { label: "Delhivery Orders", value: 0 },
          { label: "RapidShyp Orders", value: 0 },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <p className="text-gray-800 font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">📈 Orders Trend</h2>
        <OrdersChart />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">🛒 Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-900">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3 text-gray-800">#1234</td>
              <td className="p-3 text-gray-800">Amit Kumar</td>
              <td className="p-3">
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  Pending
                </span>
              </td>
              <td className="p-3 text-gray-800">₹2,500</td>
            </tr>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3 text-gray-800">#1235</td>
              <td className="p-3 text-gray-800">Neha Singh</td>
              <td className="p-3">
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                  Completed
                </span>
              </td>
              <td className="p-3 text-gray-800">₹4,200</td>
            </tr>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3 text-gray-800">#1236</td>
              <td className="p-3 text-gray-800">Ravi Sharma</td>
              <td className="p-3">
                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 font-medium">
                  Cancelled
                </span>
              </td>
              <td className="p-3 text-gray-800">₹1,800</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
