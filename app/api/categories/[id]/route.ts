// app/api/categories/[id]/route.ts
import { CategoriesService } from "@/server/categories";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params: param }: { params: { id: string } }) {
  const params = await param
  try {
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { status: 400, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    console.log(`Calling WooCommerce API: products/categories/${id}`);

    const response = await CategoriesService.getCategory(id);

    if (!response) {
      return NextResponse.json(
        { status: 404, error: "Category not found" },
        { status: 404 }
      );
    }
    const category = {
      id: response.id,
      name: response.name,
      description: response.description,
      image: response.image,
      count: response.count,
    };

    console.log(`WooCommerce response received for category ${id}`);

    return NextResponse.json(
      { status: 200, data: category },
      {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
      }
    );
  } catch (error: any) {
    console.error(`Error fetching WooCommerce category ${params.id}:`, error.message);
    return NextResponse.json(
      { status: 500, error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}