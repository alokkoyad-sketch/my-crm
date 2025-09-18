import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("crm_auth", "", { expires: new Date(0), path: "/" });
  return res;
}
