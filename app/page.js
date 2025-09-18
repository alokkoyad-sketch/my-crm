import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Dashboard() {
  // Supabase/Prisma se latest leads fetch karo
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 20, // last 20 leads
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white-900">📊 Dashboard Overview</h1>

      {/* Stats Cards (optional, yahan total count show kar sakte ho) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-gray-800 font-medium">Total Leads</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{leads.length}</p>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">🛒 Recent Leads / Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-900">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 text-gray-800">#{lead.id}</td>
                <td className="p-3 text-gray-800">{lead.name}</td>
                <td className="p-3 text-gray-800">{lead.phone}</td>
                <td className="p-3 text-gray-800">{new Date(lead.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
