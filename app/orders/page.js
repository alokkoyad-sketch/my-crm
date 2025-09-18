"use client";
import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  FileText,
  MessageCircle,
  Plus,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNo: "ORD001",
      name: "Rohit Sharma",
      course: "React Basics",
      agent: "Amit",
      awb: "AWB12345",
      date: "2025-09-14",
      mode: "Online",
      status: "Untouched",
      phone: "9188888888",
      product: "Course Book",
      price: "1200",
      pincode: "110001",
      postOffice: "Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      remarks: "",
      courier: "DTDC",
      shiprocketStatus: "Delivered",
      domain: "example.com",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "",
    shiprocketStatus: "",
    agent: "",
    fromDate: "",
    toDate: "",
    domain: "",
    product: "",
    course: "",
    courier: "",
    orderNo: "",
    mobile: "",
    customer: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [postOffices, setPostOffices] = useState([]);
  const [form, setForm] = useState({});

  // 📌 Shiprocket Status Options
  const shiprocketStatuses = [
    "Pending",
    "In Transit",
    "Delivered",
    "RTO Initiated",
    "RTO In Transit",
    "RTO Delivered",
    "Cancelled",
    "Lost",
    "Pickup Scheduled",
    "Pickup Pending",
    "Pickup Error",
    "Out For Delivery",
    "Undelivered",
  ];

  // 📌 Handle Edit
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setForm(order);
    setIsModalOpen(true);
  };

  // 📌 Handle Add Order
  const handleAdd = () => {
    setSelectedOrder(null);
    setForm({});
    setIsModalOpen(true);
  };

  // 📌 Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setForm({});
  };

  // 📌 Submit (Save / Update Order)
  const handleSubmit = () => {
    if (selectedOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? { ...o, ...form } : o))
      );
    } else {
      setOrders((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

 // ✅ Updated Fetch Post Office, City, State from PIN
const fetchPostOffices = async (pincode) => {
  try {
    if (!pincode || pincode.length !== 6) return;

    // ✅ Direct external API fetch
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

    if (!res.ok) {
      throw new Error("Failed to fetch API");
    }

    const data = await res.json();

    if (data[0]?.Status === "Success") {
      const list = data[0].PostOffice.map((po) => ({
        name: po.Name,
        district: po.District,
        state: po.State,
      }));
      setPostOffices(list);

      // Auto-fill city & state
      if (list.length > 0) {
        setForm((f) => ({
          ...f,
          postOffice: list[0].name,
          city: list[0].district,
          state: list[0].state,
        }));
      }
    } else {
      setPostOffices([]);
      alert("❌ Invalid PIN Code");
    }
  } catch (err) {
    console.error("Error fetching Post Offices:", err);
    alert("⚠️ PIN Code fetch nahi ho pa raha. Thodi der baad try karein.");
  }
};



  // 📌 Filtered Orders (Frontend Filtering)
  const filteredOrders = orders.filter((o) => {
    return (
      (filters.status ? o.status === filters.status : true) &&
      (filters.shiprocketStatus
        ? o.shiprocketStatus === filters.shiprocketStatus
        : true) &&
      (filters.agent ? o.agent === filters.agent : true) &&
      (filters.domain ? o.domain === filters.domain : true) &&
      (filters.product ? o.product === filters.product : true) &&
      (filters.course ? o.course === filters.course : true) &&
      (filters.courier ? o.courier === filters.courier : true) &&
      (filters.orderNo
        ? o.orderNo.toLowerCase().includes(filters.orderNo.toLowerCase())
        : true) &&
      (filters.mobile ? o.phone.includes(filters.mobile) : true) &&
      (filters.customer
        ? o.name.toLowerCase().includes(filters.customer.toLowerCase())
        : true) &&
      (filters.fromDate ? o.date >= filters.fromDate : true) &&
      (filters.toDate ? o.date <= filters.toDate : true)
    );
  });

  return (
    <div className="p-6 bg-white text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          <Plus size={16} /> Add Order
        </button>
      </div>

      {/* 🔍 Filters Section */}
      <div className="grid grid-cols-4 gap-2 mb-4 text-black">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-0.5 border border-black-300 rounded bg-white"
        >
          <option value="">Status</option>
          <option>Untouched</option>
          <option>In Process</option>
          <option>Callback</option>
          <option>Call Cut</option>
          <option>Not Pick</option>
          <option>Confirmed</option>
          <option>Shipped</option>
          <option>Hold</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Fake</option>
        </select>

        <select
          value={filters.shiprocketStatus}
          onChange={(e) =>
            setFilters({ ...filters, shiprocketStatus: e.target.value })
          }
          className="p-2 border border-black-300 rounded bg-white"
        >
          <option value="">ShipRocket Status</option>
          {shiprocketStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          placeholder="Agent"
          value={filters.agent}
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Domain"
          value={filters.domain}
          onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Product"
          value={filters.product}
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Course"
          value={filters.course}
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Courier"
          value={filters.courier}
          onChange={(e) => setFilters({ ...filters, courier: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Order No."
          value={filters.orderNo}
          onChange={(e) => setFilters({ ...filters, orderNo: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Mobile No."
          value={filters.mobile}
          onChange={(e) => setFilters({ ...filters, mobile: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />

        <input
          placeholder="Customer"
          value={filters.customer}
          onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
          className="p-2 border border-black-300 rounded bg-white"
        />
      </div>

      {/* 📋 Orders Table */}
      <table className="w-full border border-gray-700 mb-8">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-2 border">Order No</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Agent</th>
            <th className="p-2 border">AWB</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Mode</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="bg-gray-800 text-white">
              <td className="p-2 border">{order.orderNo}</td>
              <td className="p-2 border">{order.name}</td>
              <td className="p-2 border">{order.course}</td>
              <td className="p-2 border">{order.agent}</td>
              <td className="p-2 border">{order.awb}</td>
              <td className="p-2 border">{order.date}</td>
              <td className="p-2 border">{order.mode}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="p-1 bg-blue-500 rounded"
                >
                  <Pencil size={16} />
                </button>
                <button className="p-1 bg-red-500 rounded">
                  <Trash2 size={16} />
                </button>
                <button className="p-1 bg-gray-600 rounded">
                  <FileText size={16} />
                </button>
                <a
                  href={`https://wa.me/${order.phone}?text=Hello%20${order.name},%20your%20order%20(${order.orderNo})%20status%20is%20${order.status}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 bg-green-500 rounded"
                >
                  <MessageCircle size={16} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✏️ Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg w-2/3 p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedOrder ? "Edit Order" : "Add Order"}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-black">
              <input
                value={form.awb || ""}
                onChange={(e) => setForm({ ...form, awb: e.target.value })}
                placeholder="Tracking ID / AWB No."
                className="p-0.5 rounded col-span-2 bg-white"
              />
              <select
                value={form.courier || ""}
                onChange={(e) => setForm({ ...form, courier: e.target.value })}
                className="p-2 rounded bg-white"
              >
                <option value="">Courier Company</option>
                <option>DTDC</option>
                <option>Delhivery</option>
                <option>XpressBees</option>
                <option>Ecom Express</option>
                <option>Blue Dart</option>
                <option>India Post</option>
              </select>
              <select
                value={form.mode || ""}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="p-2 rounded bg-white"
              >
                <option value="">Mode</option>
                <option>Phone</option>
                <option>Online</option>
              </select>
              <input
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Mobile"
                className="p-2 rounded bg-white"
              />
              <input
                value={form.altPhone || ""}
                onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
                placeholder="Alternate Mobile"
                className="p-2 rounded bg-white"
              />
              <input
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Customer Name"
                className="p-2 rounded bg-white"
              />
              <select
                value={form.product || ""}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className="p-2 rounded bg-white"
              >
                <option value="">Product</option>
                <option>Male Extra</option>
                <option>The Ultra Fire</option>
              </select>
              <select
                value={form.course || ""}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="p-2 rounded bg-white"
              >
                <option value="">Course</option>
                <option>One Month</option>
                <option>Two Month</option>
              </select>
              <input
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
                className="p-2 rounded bg-white"
              />
              <input
                value={form.pincode || ""}
                onChange={(e) => {
                  setForm({ ...form, pincode: e.target.value });
                  if (e.target.value.length === 6)
                    fetchPostOffices(e.target.value);
                }}
                placeholder="PIN Code"
                className="p-2 rounded bg-white"
              />
              <select
                value={form.postOffice || ""}
                onChange={(e) =>
                  setForm({ ...form, postOffice: e.target.value })
                }
                className="p-2 rounded bg-white"
              >
                <option value="">Select Post Office</option>
                {postOffices.map((po, i) => (
                  <option key={i} value={po.name}>
                    {po.name}
                  </option>
                ))}
              </select>
              <textarea
                value={form.address || ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Full Address"
                className="p-0.5 rounded col-span-4 bg-white"
              />
              <textarea
                value={form.remarks || ""}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                placeholder="Remarks"
                className="p-0.5 rounded bg-white"
              />
              <input
                value={form.city || ""}
                readOnly
                placeholder="City (auto)"
                className="p-2 rounded bg-white"
              />
              <input
                value={form.state || ""}
                readOnly
                placeholder="State (auto)"
                className="p-2 rounded bg-white"
              />
              <select
                value={form.status || ""}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="p-2 rounded bg-white"
              >
                <option value="">Status</option>
                <option>Untouched</option>
                <option>In Process</option>
                <option>Callback</option>
                <option>Call Cut</option>
                <option>Not Pick</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Hold</option>
                <option>Completed</option>
                <option>Cancelled</option>
                <option>Fake</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
