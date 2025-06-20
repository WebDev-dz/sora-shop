import { FeaturedProducts } from "@/components/featured-products"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { ProductsService } from "@/server/products"
import { CategoriesService } from "@/server/categories"

export default async function Home() {

  const products = await ProductsService.getProducts({ limit: 6, featured: true })
  const categories = await CategoriesService.getCategories({limit: 4})
  console.log({products})
  console.log({categories})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <FeaturedProducts limit={6} initialData={{ products }} />
        <Categories initialData={{ categories }} />
    </main>
  )
}
