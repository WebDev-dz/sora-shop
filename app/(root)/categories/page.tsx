// app/categories/page.tsx
import { CategoriesService } from "@/server/categories";
import { Pages } from "@/types";
import CategoriesView from "./view";

export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: Pages.CategoriesPage["params"];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categories = await CategoriesService.getCategories({});

  // You can now access searchParams here
  console.log("Search Params:", searchParams);

  return <CategoriesView params={params} initialData={{ categories }} searchParams={searchParams} />;
}
