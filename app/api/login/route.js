import { NextResponse } from "next/server";
import { findUser } from "@/lib/userStore";

export async function POST(req) {
  const { username, password } = await req.json();
  const user = findUser(username, password);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // cookie me user info store
  const res = NextResponse.json({ success: true, user });
  res.cookies.set("crm_auth", JSON.stringify(user), {
    httpOnly: true,
    path: "/",
  });

  return res;
}
