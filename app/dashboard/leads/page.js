"use client";
import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 All Leads</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-3">{lead.id}</td>
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3">{lead.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
