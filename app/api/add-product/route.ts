import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { title, description,category,discount,image_url, stock, price, user_id } = await request.json();

  try {
    if (!title || !description || !user_id) {
      throw new Error('title, description user_id are required');
    }

    await sql`INSERT INTO products (title, description, stock, price,category,discount, image_url,user_id) VALUES (${title}, ${description}, ${stock}, ${price},${category},${discount},${image_url},${user_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const products = await sql`
    SELECT
      *
    FROM products
  `;

  return NextResponse.json({ products }, { status: 200 });
}
