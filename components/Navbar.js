"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Companies", path: "/companies" },
    { name: "Role Order Status", path: "/role-order-status" },
    { name: "Role OrderPage Options", path: "/role-orderpage-options" },
    { name: "Products", path: "/products" },
    { name: "Domains", path: "/domains" },
    { name: "Courses", path: "/courses" },
    { name: "Couriers", path: "/couriers" },
    { name: "Employees", path: "/employees" },
    { name: "Reports", path: "/reports" },
    { name: "Export Logs", path: "/export-logs" },
    { name: "Change Password", path: "/change-password" },
  ];

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login"); // redirect after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to SATVIN CRM</h1>

      <div className="flex items-center gap-4 relative">
        {/* Admin Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 font-medium hover:text-gray-900"
          >
            Admin 👋
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg p-2 z-50">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <hr className="my-2" />
              <button
                className="block w-full text-left px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
