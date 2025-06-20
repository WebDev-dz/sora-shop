// app/product/page.tsx
import { Pages } from "@/types";
import ProductView from "./view";
import { ProductsService } from "@/server/products";
import { VariationsService } from "@/server/variations";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Pages.ProductPage["params"];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = await params;
  await searchParams;
  const product = await ProductsService.getProduct(id);
  const variations = await VariationsService.getVariations(id, { per_page: 20 });
  // You can now access searchParams here
  console.log("Search Params:", searchParams);

  return <ProductView params={params} initialData={{ product ,variations }} searchParams={searchParams} />;
}
