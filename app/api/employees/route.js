// app/api/employees/route.js
import { NextResponse } from "next/server";
import { listUsers, createUser } from "@/lib/userStore";

export async function GET() {
  return NextResponse.json({ users: listUsers() });
}

export async function POST(req) {
  const { username, password, role, permissions } = await req.json();

  const user = createUser(username, password, role, permissions);

  return NextResponse.json(user);
}
