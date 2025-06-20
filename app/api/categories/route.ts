// app/api/categories/route.ts
import { Categories } from "@/components/categories";
import { CategoriesService } from "@/server/categories";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint") || "products/categories";
    const params = Object.fromEntries(searchParams);

    if (!endpoint) {
      return NextResponse.json(
        { status: 400, error: "Endpoint is required" },
        { status: 400 }
      );
    }

    console.log(`Calling WooCommerce API: ${endpoint}`, params);

    const response = await CategoriesService.getCategories(params);
    const mappedData = response.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
      count: category.count,
    }));

    console.log(`WooCommerce response received with ${mappedData.length} categories`);

    return NextResponse.json(
      { status: 200, data: mappedData },
      {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
      }
    );
  } catch (error: any) {
    console.error("Error fetching WooCommerce categories:", error.message);
    return NextResponse.json(
      { status: 500, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}