// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   const { id,name, email,img } = await request.json();

//   try {
//     if (!id ||!name || !email || !img ) throw new Error('name and email are required');

//     // Insert user into the users table
//     await sql`
//       INSERT INTO AuthUsers (name, email)
//       VALUES (${id},${name}, ${email},${img});
//     `;

//     const users = await sql`SELECTs id FROM AuthUsers ORDER BY id DESC LIMIT 1;`;
//     const userId = users.rows[0].id;

//     await sql`
//       INSERT INTO carts (user_id, products)
//       VALUES (${userId}, '{}');
//     `;

//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
//   const allUsers = await sql`SELECT * FROM AuthUsers;`;

//   return NextResponse.json({ users: allUsers }, { status: 200 });
// }

import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export async function GET(_: NextRequest) {
  try {
    const session = await getSession();

    if (session?.user) {
      const { sub, nickname, email, picture } = session.user;

      const user = await sql`SELECT * FROM users WHERE sub = ${sub}`;

      if (!user.rows.length)
        await sql`INSERT INTO users (sub ,name, email, image_url) VALUES ( ${sub},${nickname}, ${email}, ${picture});`;

      const users = await sql`SELECT id FROM users ORDER BY id DESC LIMIT 1;`;
      const userId = users.rows[0].id;

      await sql`
      INSERT INTO carts (user_id, products)
      VALUES (${userId}, '{}');
    `;
    } else {
      return redirect("/api/auth/logout");
    }
  } catch (error) {
    return redirect("/api/auth/logout");
  }

  return redirect("/");
}
