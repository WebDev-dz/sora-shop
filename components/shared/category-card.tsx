import  Link  from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../language-provider";
import { Card, CardContent, CardFooter } from "../ui/card";
import { CategoryItem } from "@/types/categories";

// Skeleton Card Component
export function CategoryCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
      <CardContent className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </CardFooter>
    </Card>
  );
}

// Enhanced Category Card Component
export function CategoryCard({ category }: { category: CategoryItem }) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card className="group overflow-hidden  transition-all duration-300 border-0 shadow-sm hover:shadow-xl">
      <Link href={`/categories/${category.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          {/* Image Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Main Image */}
          <img
            src={imageError ? "/placeholder.svg" : category.image?.src || "/placeholder.svg"}
            alt={category.name}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            width={200}
            height={200}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category Badge */}
          
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {category.name}
          </h3>
          
          {category.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="font-medium">{category.count}</span>
            <span>{mounted ? t("product.products") : "منتج"}</span>
          </span>
          
         
        </CardFooter>
      </Link>
    </Card>
  );
}

// Grid Component for Multiple Cards
export function CategoryGrid({ 
  categories, 
  loading = false, 
  skeletonCount = 8 
}: { 
  categories?: CategoryItem[], 
  loading?: boolean, 
  skeletonCount?: number 
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

