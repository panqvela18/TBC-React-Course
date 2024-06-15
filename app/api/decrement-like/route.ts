import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Fetch the current likes count from the database
    const product = await sql`
      SELECT likes
      FROM products
      WHERE id = ${id}
    `;

    // Extract the current likes count
    const currentLikes = product.rows[0].likes;

    // Increment the likes count by 1
    const newLikes = currentLikes - 1;

    // Update the database with the new likes count
    await sql`
      UPDATE products
      SET likes = ${newLikes}
      WHERE id = ${id}
    `;

    return NextResponse.json({ likes: newLikes }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
