import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PUT(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    // Fetch the current liked products array from the database
    const userResult = await sql`
      SELECT likedProducts
      FROM users
      WHERE id = ${userId}
    `;

    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    // Log the retrieved user data
    console.log("Retrieved user data:", user);

    // Use the likedProducts array if it exists, otherwise use an empty array
    const currentLikedProducts = user.likedProducts || [];

    // Log the current liked products
    console.log("Current liked products:", currentLikedProducts);

    let newLikedProducts;

    if (currentLikedProducts.includes(productId)) {
      // Remove productId from the array
      newLikedProducts = currentLikedProducts.filter((id: any) => id !== productId);
    } else {
      // Add productId to the array
      newLikedProducts = [...currentLikedProducts, productId];
    }

    // Update the database with the new array
    await sql`
      UPDATE users
      SET likedProducts = ${JSON.stringify(newLikedProducts)}::jsonb
      WHERE id = ${userId}
    `;

    // Log the new liked products
    console.log("New liked products:", newLikedProducts);

    return NextResponse.json({ likedProducts: newLikedProducts }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
