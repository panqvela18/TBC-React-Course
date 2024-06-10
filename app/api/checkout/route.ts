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
  const { products } = await request.json();

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
    line_items: stripeItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
});

return NextResponse.json({ url: session.url });
};
