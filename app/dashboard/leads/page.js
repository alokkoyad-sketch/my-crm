import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 All Leads</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-3">{lead.id}</td>
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3">{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
