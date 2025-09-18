// src/pages/ExportLogs.jsx
import React from "react";

const logs = [
  { file: "orders.csv", date: "2025-09-15", type: "CSV" },
  { file: "report.pdf", date: "2025-09-14", type: "PDF" },
];

export default function ExportLogs() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Export Logs</h2>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-black">File</th>
            <th className="p-2 text-black">Date</th>
            <th className="p-2 text-black">Type</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 text-black">{log.file}</td>
              <td className="p-2 text-black">{log.date}</td>
              <td className="p-2 text-black">{log.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
          Download CSV
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow">
          Download PDF
        </button>
      </div>
    </div>
  );
}
