"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import useSWR from "swr"
import { Loader2 } from "lucide-react"

import { Product } from "@/types/products"
import { ProductCard, ProductCardSkeleton } from "./shared/product-card"
import { useGetProducts } from "@/services/products"
import { useEffect } from "react"


type Props = {
  limit?: number
  initialData?: { products: Product[] }
}

export function FeaturedProducts( { initialData, limit = 6 }: Props) {
  const { t } = useLanguage()
  const { data: products = initialData?.products, error, isPending: isLoading, mutate: getProducts } = useGetProducts()

  const perPage = 6

  useEffect(() => {
    
      // getProducts({ limit })
    
  }, [products?.length, limit])

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-2 text-lg">{t("loading")}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 flex justify-center items-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">{t("error.title")}</h2>
          <p>{t("error.fetchProducts")}</p>
        </div>
      </section>
    )
  }

  if (!products?.length) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 flex justify-center items-center">
          <p>{t("featured.noProducts")}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t("featured.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("featured.description")}
            </p>
          </div>
        </div>
        {/* Products Grid */}
        <div className="mt-12">
          {isLoading ? (
             <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
              {Array.from({ length: perPage }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
            {products?.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          )}
        </div>
        <div className="flex justify-center mt-24">
          <Link href="/products">
            <Button variant="outline" className="gap-1">
              {t("featured.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

