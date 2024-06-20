import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0;

 
export async function POST(request: Request) {
  const { title, description, image_url } = await request.json();

  try {
    if (!title || !description) throw new Error('title and description are required');
    await sql`INSERT INTO blogs (title, description, image_url) VALUES (${title}, ${description}, ${image_url});`;
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }

  try {
    const blogs = await sql`SELECT
      id,
      title,
      description,
      image_url,
      created_at
    FROM blogs`;

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
