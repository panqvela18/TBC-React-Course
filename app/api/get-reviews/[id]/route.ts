import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(request: NextRequest) {
    const id = request.nextUrl.pathname.replace('/api/get-reviews/', '');

    try {
        const reviews = await sql`
            SELECT 
                r.id AS id,
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
                users u ON u.id = r.user_id
            JOIN 
                products p ON p.id = r.product_id
            WHERE 
                r.user_id = ${Number(id)}
        `;

        return NextResponse.json({ reviews: reviews.rows }, { status: 200 });
    } catch (error) {
        console.error('Error fetching reviews:', error);

        return NextResponse.json({ error: 'Error fetching reviews' }, { status: 500 });
    }
}
