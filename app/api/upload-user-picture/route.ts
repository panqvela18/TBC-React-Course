import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { blobUrl, userSub } = await request.json();

  console.log(request.body);

  try {
    await sql`UPDATE users SET image_url=${blobUrl} WHERE sub = ${userSub};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users ORDER BY sub ASC;`;

  return NextResponse.json({ users }, { status: 200 });
}
