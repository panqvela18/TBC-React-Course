import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/update-product/', '');
  const { title, description, category, discount, image_url, stock, price, user_id } = await request.json();

  try {
    if (!id) throw new Error('ID is required');

    await sql`
      UPDATE products 
      SET title=${title}, description=${description}, stock=${stock}, price=${price}, category=${category}, discount=${discount}, image_url=${image_url}, user_id=${user_id} 
      WHERE id=${id};
    `;
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }

  try {
    const products = await sql`SELECT * FROM products ORDER BY id ASC;`;
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
