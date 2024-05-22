import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Clear the cart by setting products to an empty object
    const updatedCart = await sql`
      UPDATE carts
      SET products = '{}'::jsonb
      WHERE user_id = ${Number(userId)}
      RETURNING *
    `;

    return NextResponse.json({ updatedCart }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
