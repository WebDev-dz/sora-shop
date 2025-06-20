// app/api/orders/route.ts
import { OrdersService } from "@/server/orders"
import { CreateOrder } from "@/types/orders"
import { NextRequest, NextResponse } from "next/server"





export async function POST(req: NextRequest) {
  try {
    const orderData : CreateOrder = await req.json()
    
    if (!orderData.line_items || orderData.line_items.length === 0) {
      return NextResponse.json({ status: 400, error: "No items in order" }, { status: 400 })
    }

    const response = await OrdersService.createOrder(orderData)
    console.log(response)
    if (!response) {
      return NextResponse.json({ status: 404, error: "failed to create order" }, { status: 404 })
    }
    
    return NextResponse.json(
      { status: 200, data: response },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error: any) {
    console.error("Error creating WooCommerce order:", error.message)
    return NextResponse.json({ status: 500, error: "Failed to create order" }, { status: 500 })
  }
}