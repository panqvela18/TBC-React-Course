import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  _: NextRequest,
  { params: { subId } }: { params: { subId: string } }
) {
  try {
    const userImage =
      await sql`SELECT role FROM users WHERE sub = ${subId}`;
    return NextResponse.json({ userImage }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
