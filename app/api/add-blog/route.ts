import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { title, description, image_url, user_id} = await request.json();

  try {
    if (!title || !description || !user_id) throw new Error('name,email and age are required');
    await sql`INSERT INTO blogs (title, description, image_url, user_id) VALUES (${title}, ${description},${image_url},${user_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const blogs = await sql`SELECT
  blogs.id,
  blogs.title,
  blogs.description,
  blogs.image_url,
  blogs.created_at,
  users.name AS author
FROM blogs
JOIN users ON blogs.user_id = users.id;`;
  return NextResponse.json({ blogs }, { status: 200 });
}
