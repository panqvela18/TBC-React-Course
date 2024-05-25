import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { name, email } = await request.json();

  try {
    if (!name || !email ) throw new Error('name and email are required');

    // Insert user into the users table
    await sql`
      INSERT INTO users (name, email) 
      VALUES (${name}, ${email});
    `;

    const users = await sql`SELECT id FROM users ORDER BY id DESC LIMIT 1;`;
    const id = users.rows[0].id;

    await sql`
      INSERT INTO carts (user_id, products) 
      VALUES (${id}, '{}');
    `;

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const allUsers = await sql`SELECT * FROM users;`;

  return NextResponse.json({ users: allUsers }, { status: 200 });
}
