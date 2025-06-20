import { ProductsService } from "@/server/products"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    const per_page = searchParams.get("per_page") || "10"
    const page = searchParams.get("page") || "1"
    const order = searchParams.get("order") || "asc"
    const orderby = searchParams.get("orderby") || "title"
    const search = searchParams.get("search")
    const status = searchParams.get("status") || "publish"

    // Build query parameters dynamically
    const params: any = {
      per_page: parseInt(per_page),
      page: parseInt(page),
      order,
      orderby,
      status,
    }

    // Add specific filters if provided
    if (featured === "true") {
      params.featured = true
    }
    if (category) {
      params.category = category
    }
    if (search) {
      params.search = search
    }

    // Construct the endpoint (handle specific product by ID)


    const response = await ProductsService.getProducts(params)
    console.log({response})
   


    return NextResponse.json(
      { status: 200, data: response },
      {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
      }
    )
  } catch (error: any) {
    console.error("Error fetching WooCommerce products:", error.message)
    return NextResponse.json(
      { status: 500, error: error.message || "Failed to fetch products" },
      { status: 500 }
    )
  }
}