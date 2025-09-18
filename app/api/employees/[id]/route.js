// app/api/employees/[id]/route.js
import { NextResponse } from "next/server";
import { updateUser, deleteUser } from "@/lib/userStore";

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const updated = updateUser(params.id, data);

    if (!updated) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deleted = deleteUser(params.id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
