// app/category/page.tsx
import { CategoriesService } from "@/server/categories";
import { Pages } from "@/types";
import CategoryView from "./view";
import { ProductsService } from "@/server/products";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Pages.CategoryPage["params"];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = await params;
  const categoryId = Number(id);
  const category = !isNaN(categoryId) ? await CategoriesService.getCategory(categoryId) : undefined;
  const products = await ProductsService.getProducts({ category: id });
  // You can now access searchParams here
  console.log("Search Params:", searchParams);

  return <CategoryView params={params} initialData={{ category, products }} searchParams={searchParams} />;
}
