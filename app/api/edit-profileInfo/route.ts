import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, nickname, userSub, email } = await request.json();

  try {
    // Corrected SQL query with comma between 'name' and 'email'
    await sql`UPDATE users SET nickname=${nickname}, name=${name}, email=${email} WHERE sub=${userSub};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  let users;
  try {
    users = await sql`SELECT * FROM users ORDER BY sub ASC;`;
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }

  return NextResponse.json({ users }, { status: 200 });
}
