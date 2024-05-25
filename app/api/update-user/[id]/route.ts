import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/update-user/', '');
  const {name,email}= await request.json()

  try {
    if (!id) throw new Error('ID is required');

    await sql`UPDATE users SET name=${name},email=${email} WHERE id = ${Number(id)};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users ORDER BY id ASC;`;

  return NextResponse.json({ users }, { status: 200 });
}