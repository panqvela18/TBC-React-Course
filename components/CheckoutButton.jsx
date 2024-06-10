"use client"

export default function CheckoutButton({checkout}) {
  return (
    <button onClick={()=>checkout()}>Buy Now</button>
  )
}
