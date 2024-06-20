import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0;


export async function POST(request: Request) {
  try {
    const { title, description, category, discount, image_url, stock, price, imageGallery } = await request.json();

    // Validation
    if (!title || !description) {
      throw new Error('Title and description are required');
    }

    // Convert image_gallery to JSON string
    const imageGalleryJson = JSON.stringify(imageGallery);

    // Insert into database
    await sql`
      INSERT INTO products (title, description, stock, price, category, discount, image_url, image_gallery)
      VALUES (${title}, ${description}, ${stock}, ${price}, ${category}, ${discount}, ${image_url}, ${imageGalleryJson}::jsonb);
    `;

    // Fetch all products
    const products = await sql`
      SELECT *
      FROM products
    `;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
