import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: save new lead
export async function POST(req) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        message: body.message || null,
      },
    });
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET: fetch all leads
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { id: "desc" }, // latest first
    });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
