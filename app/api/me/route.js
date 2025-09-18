// app/api/me/route.js
import { NextResponse } from "next/server";
import { listUsers } from "@/lib/userStore";

export async function GET(req) {
  try {
    const cookie = req.cookies.get("crm_auth")?.value;
    if (!cookie) return NextResponse.json({ ok: false }, { status: 401 });
    const user = JSON.parse(cookie);
    // optionally can fetch latest user from store by id/username
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
