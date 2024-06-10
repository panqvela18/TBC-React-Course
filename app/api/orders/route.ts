import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export const revalidate = 0;

export async function GET() {
  try {
    const payments = await stripe.checkout.sessions.list();
    const paymentData = payments.data;
    console.log(paymentData)

    return NextResponse.json(paymentData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
