// app/api/products/[id]/attributes/route.ts

import { AttributesService } from "@/server/attributes";
import { NextRequest, NextResponse } from "next/server"





export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await params;
    const { id } = params
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ status: 400, error: "Invalid product ID" }, { status: 400 })
    }

    const response = await AttributesService.getAttributes(id, { per_page: 100 })
    

    return NextResponse.json(
      { status: 200, data: response },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    )
  } catch (error: any) {
    console.error(`Error fetching WooCommerce attributes for product ${params.id}:`, error.message)
    return NextResponse.json({ status: 500, error: "Failed to fetch attributes" }, { status: 500 })
  }
}