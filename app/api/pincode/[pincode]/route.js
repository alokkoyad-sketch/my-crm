// app/api/pincode/[pincode]/route.js
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { pincode } = params;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
