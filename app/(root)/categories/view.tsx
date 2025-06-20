"use client";

import { useLanguage } from "@/components/language-provider";
import { useGetCategories } from "@/services/categories";
import { Pages } from "@/types";
import { ErrorBoundary } from "@/components/error-boundary";
import { CategoryCard, CategoryCardSkeleton } from "@/components/shared/category-card";
import { Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

type Props = Pages.CategoriesPage;

export default function CategoriesView({ params, initialData, searchParams }: Props) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const {
    data: categories = initialData?.categories,
    error,
    isPending: isLoading,
  } = useGetCategories();

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

  return (
    <ErrorBoundary>
      <div className="container py-8 md:py-12 space-y-8">
        {/* Animated Header */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center justify-center space-y-6 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent">
            {t("categories.title")}
          </h1>
          <p className="max-w-2xl text-gray-600 md:text-lg leading-relaxed">
            {t("categories.description")}
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <CategoryCardSkeleton />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-[400px]">
            <div className="relative">
              <Package className="h-16 w-16 text-gray-300 animate-pulse" />
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-red-600">{t("error.title")}</h2>
              <p className="text-gray-600 max-w-md">{t("failed_to_fetch_categories")}</p>
            </div>
            <Button onClick={() => location.reload()} className="bg-green-600 hover:bg-green-700">
              {t("retry")}
            </Button>
          </div>
        ) : categories?.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-[400px]">
            <div className="relative">
              <Package className="h-16 w-16 text-gray-300" />
              <Search className="h-6 w-6 text-gray-400 absolute -top-1 -right-1" />
            </div>
            <h2 className="text-2xl font-bold">{t("no_categories_found")}</h2>
            <p className="text-gray-600">{t("category_empty_description")}</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
            {categories?.map((category, i) => (
              <div
                key={category.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
