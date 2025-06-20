// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { Product } from '../../../../types/products';
import { ProductsService } from "@/server/products";



export async function GET(req: NextRequest, { params: param }: { params: { id: string } }) {
  try {
    const params = await param;
    const { id } = params
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ status: 400, error: "Invalid product ID" }, { status: 400 })
    }

    const response = await ProductsService.getProduct(id)
    
    console.log(response)
    if (!response) {
      return NextResponse.json({ status: 404, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(
      { status: 200, data: response },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    )
  } catch (error: any) {
    console.error(`Error fetching WooCommerce product ${param.id}:`, error.message)
    return NextResponse.json({ status: 500, error: "Failed to fetch product" }, { status: 500 })
  }
}