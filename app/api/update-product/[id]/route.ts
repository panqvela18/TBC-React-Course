import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/update-product/', '');
  const { title, description, category, discount, stock, price, imageGallery } = await request.json();

  try {
    if (!id) throw new Error('ID is required');

    const imageGalleryJson = JSON.stringify(imageGallery);

    await sql`
      UPDATE products 
      SET title=${title}, description=${description}, stock=${stock}, price=${price}, category=${category}, discount=${discount}, image_gallery=${imageGalleryJson}
      WHERE id=${id};
    `;

    const products = await sql`SELECT * FROM products ORDER BY id ASC;`;
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
