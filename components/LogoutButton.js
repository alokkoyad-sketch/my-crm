"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login"); // logout ke baad login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
    >
      Logout
    </button>
  );
}
