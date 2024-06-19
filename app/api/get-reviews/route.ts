import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    // Fetch reviews along with user names, product names, and review IDs from the database
    const reviews = await sql`
      SELECT 
        r.id AS review_id,
        u.name AS user_name, 
        u.email, 
        u.id AS user_id, 
        r.star, 
        r.message,
        r.product_id,
        p.title AS product_name
      FROM 
        reviews r 
      JOIN 
        users u ON r.user_id = u.id
      JOIN 
        products p ON r.product_id = p.id
    `;

    return NextResponse.json({ reviews: reviews.rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Error fetching reviews' }, { status: 500 });
  }
}
