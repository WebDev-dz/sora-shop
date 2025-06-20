"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useState, Suspense, useEffect, useRef } from "react";
import { Pages } from "@/types";
import { useGetProducts } from "@/services/products";
import { Product } from "@/types/products";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Grid3X3,
  Grid2X2,
  List,
  SortAsc,
  SortDesc,
  RefreshCw,
  TrendingUp,
  Package,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = Pages.ProductsPage & {
  initialData?: { products: Product[] };
};

type ViewMode = "grid-4" | "grid-3" | "grid-2" | "list";
type SortOption = "name" | "price-low" | "price-high" | "newest" | "popular";

function ProductsContent({ params, searchParams, initialData }: Props) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  // const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const perPage = 20;

  const {
    data: products = initialData?.products,
    error,
    isPending: isLoading,
    mutate: refetch,
  } = useGetProducts();

  // Intersection Observer for header animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = products
    ? [...products]
        .filter((product) => {
          const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          const matchesCategory =
            selectedCategories.length === 0 ||
            product.categories.some((cat) =>
              selectedCategories.includes(cat.name)
            );
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "name":
              return a.name.localeCompare(b.name);
            case "price-low":
              return parseFloat(a.price) - parseFloat(b.price);
            case "price-high":
              return parseFloat(b.price) - parseFloat(a.price);
            case "popular":
              return b.total_sales - a.total_sales;
            case "newest":
            default:
              return (
                new Date(b.date_created).getTime() -
                new Date(a.date_created).getTime()
              );
          }
        })
    : [];

  const totalProducts = filteredAndSortedProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts =
    filteredAndSortedProducts?.slice(startIndex, endIndex) || [];

  // Get unique categories
  const allCategories = products
    ? [...new Set(products.flatMap((p) => p.categories.map((c) => c.name)))]
    : [];

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, sortBy]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getGridClass = () => {
      return "grid gap-6 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]";
  };

  const getSortLabel = (option: SortOption) => {
    return t(`sort.${option}`);
  };

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-[400px]">
          <div className="relative">
            <Package className="h-16 w-16 text-gray-300 animate-pulse" />
            <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-600">
              {t("error.title")}
            </h2>
            <p className="text-gray-600 max-w-md">{t("error.fetchProducts")}</p>
          </div>
          <Button
            onClick={() => refetch({ page: currentPage })}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {t("retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
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
              {t("nav.products")}
            </h1>
            <p className="max-w-2xl text-gray-700 md:text-lg leading-relaxed">
              {t("products.description")}
            </p>
          </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>{products?.length || 0} Products</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Updated Daily</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("products.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {allCategories.slice(0, 6).map((category) => (
              <Badge
                key={category}
                variant={
                  selectedCategories.includes(category) ? "default" : "outline"
                }
                className={`
                  cursor-pointer transition-all duration-200 hover:scale-105
                  ${
                    selectedCategories.includes(category)
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-green-50 hover:border-green-200"
                  }
                `}
                onClick={() => {
                  setSelectedCategories((prev) =>
                    prev.includes(category)
                      ? prev.filter((c) => c !== category)
                      : [...prev, category]
                  );
                }}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 hover:bg-green-50 hover:border-green-200"
                >
                  <SortAsc className="h-4 w-4" />
                  {getSortLabel(sortBy)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(
                  [
                    "newest",
                    "name",
                    "price-low",
                    "price-high",
                    "popular",
                  ] as SortOption[]
                ).map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={
                      sortBy === option ? "bg-green-50 text-green-700" : ""
                    }
                  >
                    {getSortLabel(option)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

           
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategories.length > 0) && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="gap-1">
                {category}
                <button
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== category)
                    )
                  }
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!isLoading && (
        <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of{" "}
            {totalProducts} products
          </span>
          {(searchQuery || selectedCategories.length > 0) && (
            <span className="text-green-600 font-medium">
              {t("filters.filteredResults")}
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div className={getGridClass()}>
        {isLoading ? (
          Array.from({ length: perPage }).map((_, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <ProductCardSkeleton />
            </div>
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center space-y-6 text-center py-12">
            <div className="relative">
              <Package className="h-16 w-16 text-gray-300" />
              <Search className="h-6 w-6 text-gray-400 absolute -top-1 -right-1" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{t("products.noResults")}</h2>
              <p className="text-gray-600 max-w-md">
                {searchQuery || selectedCategories.length > 0
                  ? "Try adjusting your search or filters"
                  : t("products.noProductsAvailable")}
              </p>
            </div>
            {(searchQuery || selectedCategories.length > 0) && (
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                }}
                variant="outline"
                className="gap-2"
              >
                {t("filters.clear")}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-green-50 hover:border-green-200 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("pagination.previous")}
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={`
                      w-10 h-10 p-0
                      ${
                        currentPage === pageNum
                          ? "bg-green-600 hover:bg-green-700"
                          : "hover:bg-green-50 hover:border-green-200"
                      }
                    `}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-green-50 hover:border-green-200 disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2">
            {`${t("pagination.pageInfo", {
              currentPage,
              totalPages,
              totalProducts,
            })}`}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsView(props: Props) {
  return (
    <ErrorBoundary
      fallback={
        <div className="container py-8 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-[400px]">
            <div className="relative">
              <Package className="h-16 w-16 text-gray-300 animate-pulse" />
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-600">
              Something went wrong
            </h2>
            <p className="text-gray-600">
              Please refresh the page to try again.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="container py-8 md:py-12 space-y-8">
            {/* Header Skeleton */}
            <div className="flex flex-col items-center space-y-4 animate-pulse">
              <div className="h-12 w-64 bg-gray-200 rounded-lg"></div>
              <div className="h-6 w-96 bg-gray-200 rounded"></div>
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Filters Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-4 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <ProductsContent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
