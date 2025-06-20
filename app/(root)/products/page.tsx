// app/products/page.tsx
import { ProductsService } from "@/server/products";
import { Pages } from "@/types";
import ProductsView from "./view";

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Pages.ProductsPage["params"];
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  await searchParams;
  // Fetch products using the ProductsService
  // This is where you can use the searchParams if needed
  const products = await ProductsService.getProducts({limit: 10, offset: 0});

  // You can now access searchParams here
  console.log("Products:", products);
  return <ProductsView params={params} initialData={{ products }} searchParams={searchParams} />;
}
