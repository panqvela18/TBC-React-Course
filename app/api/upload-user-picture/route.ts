import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { blobUrl, userSub } = await request.json();

  console.log(blobUrl, userSub);

  if (blobUrl || userSub) {
    try {
      await sql`UPDATE users SET image_url=${blobUrl} WHERE sub = ${userSub};`;
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  const users = await sql`SELECT * FROM users ORDER BY sub ASC;`;

  return NextResponse.json({ users }, { status: 200 });
}
