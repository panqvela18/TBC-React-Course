import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const contacts = await sql`SELECT * FROM contact_form ORDER BY id ASC;`;
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}