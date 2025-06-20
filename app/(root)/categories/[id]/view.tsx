"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/components/cart-provider";
import { useEffect, useState, useRef } from "react";
import { Pages } from "@/types";
import { useGetCategoryItem } from "@/services/categories";
import { useGetProducts } from "@/services/products";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/shared/product-card";
import { ErrorBoundary } from "@/components/error-boundary";
import { Package, Search } from "lucide-react";

type Props = Pages.CategoryPage;

export default function CategoryView({
  params,
  initialData,
  searchParams,
}: Props) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const {
    data: category = initialData?.category,
    error: categoryError,
    isPending: isCategoriesLoading,
  } = useGetCategoryItem();

  const {
    mutate: getProducts,
    data: products = initialData?.products,
    error: productsError,
    isPending: isProductsLoading,
  } = useGetProducts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (params.id) getProducts({ category: params.id });
  }, [params.id, getProducts]);

  if (isCategoriesLoading || isProductsLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-96 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (categoryError || productsError) {
    return (
      <div className="container py-8 md:py-12 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Package className="h-16 w-16 text-gray-300 animate-pulse" />
          <h2 className="text-xl font-bold text-red-500">{t("error")}</h2>
          <p className="text-gray-600">{t("error.fetchCategory")}</p>
          <Button
            onClick={() => location.reload()}
            className="bg-green-600 hover:bg-green-700"
          >
            {t("retry")}
          </Button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container py-8 md:py-12 flex justify-center items-center">
        <p className="text-lg text-center">{t("noCategory")}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container py-8 md:py-12 space-y-8">
        {/* Animated Header */}
        <div
          ref={headerRef}
          className={`relative rounded-2xl overflow-hidden px-6 py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-green-100 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="max-w-2xl text-gray-700 md:text-lg leading-relaxed">
              {category.description || t("category.description")}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-white/20 to-green-50/30 blur-3xl" />
        </div>

        {/* Products or Empty */}
        {products?.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-[300px]">
            <div className="relative">
              <Package className="h-16 w-16 text-gray-300" />
              <Search className="h-6 w-6 text-gray-400 absolute -top-1 -right-1" />
            </div>
            <h2 className="text-2xl font-bold">{t("noProducts")}</h2>
            <p className="text-gray-600">{t("category.emptyProducts")}</p>
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
    </ErrorBoundary>
  );
}
