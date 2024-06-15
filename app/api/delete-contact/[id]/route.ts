import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/delete-contact/', '');

  try {
    if (!id) throw new Error('ID is required');

    await sql`DELETE FROM contact_form WHERE id = ${+id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const contacts = await sql`SELECT * FROM contact_form;`;

  return NextResponse.json({ contacts }, { status: 200 });
}