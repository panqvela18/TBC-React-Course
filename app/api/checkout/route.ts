import { ProductFromVercel } from "@/app/interface";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products,user } = await request.json();

  const data: ProductFromVercel[] = products;
  let activeProducts = await getActiveProducts();
  try {
    for (const product of data) {
      const stripeProduct = activeProducts.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() == product?.title?.toLowerCase()
      );
      if (stripeProduct == undefined) {
         await stripe.products.create({
          name: product.title,
          default_price_data: {
            unit_amount: Number(product.price) * 100,
            currency: "usd",
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
  activeProducts = await getActiveProducts();
let stripeItems: any = [];

for (const product of data) {
    const stripeProduct = activeProducts?.find(
        (prod: any) => prod?.name?.toLowerCase() == product?.title?.toLowerCase()
    );

    if (stripeProduct) {
        stripeItems.push({
            price: stripeProduct?.default_price,
            quantity: product?.quantity,
        });
    }
}

const session = await stripe.checkout.sessions.create({
  line_items: stripeItems, // Ensure stripeItems is correctly defined and populated
  mode: "payment",
  customer_email: user.email, // Ensure user.email is correctly defined
  payment_intent_data: {
    metadata: {
      id: user.sub, // Ensure user.sub is correctly defined
      phone: user.phone, // Ensure user.phone is correctly defined
      // city: user.city, 
      address: user.address, // Ensure user.address is correctly defined
    },
  },
  success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/success`, // Ensure Host is correctly defined
  cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/cancel`, // Ensure Host is correctly defined
});

return NextResponse.json({ url: session.url });
};
