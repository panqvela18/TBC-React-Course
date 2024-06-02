import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { name, surname, email, message } = await request.json();

  try {
    if (!name || !surname || !email) throw new Error('Name, surname, and email are required');
    await sql`INSERT INTO contact_form (name, surname, email, message) VALUES (${name}, ${surname}, ${email}, ${message});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const contacts = await sql`SELECT * FROM contact_form`;
  return NextResponse.json({ contacts }, { status: 200 });
}
