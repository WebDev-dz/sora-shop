import { Product } from "@/types/products";
import { Loader2, ShoppingCart, Heart, Eye, Star, Zap, TrendingUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/components/cart-provider";
import { useLanguage } from "@/components/language-provider";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  const { addToCart } = useCartStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through images on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1000);
    } else {
      setImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  const formattedPrice = () => {
    const price = parseFloat(product.price) || 0;
    const salePrice = parseFloat(product.sale_price || "0") || 0;
    const regularPrice = parseFloat(product.regular_price || "0") || 0;

    if (salePrice > 0 && salePrice < regularPrice) {
      const discount = Math.round(((regularPrice - salePrice) / regularPrice) * 100);
      return (
        <div className="space-y-1 flex justify-between items-center">
          <div>
            <span className="line-through text-gray-400 text-sm mr-2">
              {regularPrice} {t("currency")}
            </span>
            <span className="text-green-600 font-bold text-lg">
              {salePrice} {t("currency")}
            </span>
          </div>
          <Badge variant="destructive" className="text-xs animate-pulse">
            -{discount}%
          </Badge>
        </div>
      );
    }
    return (
      <span className="text-lg font-bold text-gray-900">
        {price} {t("currency")}
      </span>
    );
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        images: product.images,
        quantity: 1,
      });
      
      // Success animation
      const button = document.getElementById(`add-to-cart-${product.id}`);
      if (button) {
        button.classList.add('animate-bounce');
        setTimeout(() => button.classList.remove('animate-bounce'), 600);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    // Add haptic feedback simulation
    const heart = document.getElementById(`heart-${product.id}`);
    if (heart) {
      heart.classList.add('animate-ping');
      setTimeout(() => heart.classList.remove('animate-ping'), 300);
    }
  };

  const getRatingStars = () => {
    const rating = parseFloat(product.average_rating) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStockBadge = () => {
    if (product.stock_quantity > 10) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <TrendingUp className="h-3 w-3 mr-1" />
          In Stock
        </Badge>
      );
    } else if (product.stock_quantity > 0) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 animate-pulse">
          <Zap className="h-3 w-3 mr-1" />
          Low Stock ({product.stock_quantity})
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="animate-pulse">
          Out of Stock
        </Badge>
      );
    }
  };

  return (
    <Card 
      ref={cardRef}
      className={`
        flex flex-col
        mx-auto
        max-w-[300px]
        group relative overflow-hidden transition-all duration-500 cursor-pointer
        ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}
        hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2
        ${isHovered ? 'scale-105 ring-2 ring-green-500/50' : 'scale-100'}
        bg-gradient-to-br from-white via-white to-gray-50
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.featured && (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
            ⭐ Featured
          </Badge>
        )}
        {product.on_sale && product.stock_quantity > 0 && (
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white animate-bounce">
            🔥 Sale
          </Badge>
        )}
        {product.stock_quantity <= 0 && (
          <Badge className="bg-red-600 text-white font-bold text-sm px-3 py-1 animate-pulse">
            OUT OF STOCK
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`
        absolute top-3 right-3 z-20 flex flex-col gap-2 transition-all duration-300
        ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
      `}>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={handleFavoriteToggle}
        >
          <Heart 
            id={`heart-${product.id}`}
            className={`h-4 w-4 transition-colors ${
              isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`} 
          />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={() => setShowQuickView(true)}
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      {/* Image Container */}
      <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Loading shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
          
          <img
            src={product.images?.[imageIndex]?.src || "/placeholder.svg"}
            alt={product.name || "Product image"}
            className={`
              h-full w-full object-cover transition-all duration-700
              ${isHovered && product.stock_quantity > 0 ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}
              ${product.stock_quantity <= 0 ? 'grayscale opacity-60' : 'group-hover:brightness-110'}
            `}
            loading="lazy"
          />
          
          {/* Image indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`
                    h-1.5 w-1.5 rounded-full transition-all duration-300
                    ${index === imageIndex ? 'bg-white scale-125' : 'bg-white/50'}
                  `}
                />
              ))}
            </div>
          )}

          {/* Overlay gradient */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} />
        </div>
      </Link>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg leading-tight flex-1">
            <Link 
              href={`/products/${product.id}`}
              className="hover:text-green-600 transition-colors duration-200 font-semibold"
            >
              {product.name}
            </Link>
          </CardTitle>
        </div>
        
        {/* Rating */}
        {product.rating_count > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {getRatingStars()}
            </div>
            <span className="text-xs text-gray-500">
              ({product.rating_count})
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 py-2 space-y-3">
        {/* Price */}
        <div className="">
          {formattedPrice()}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          {getStockBadge()}
          {product.total_sales > 0 && (
            <span className="text-xs text-gray-500">
              {product.total_sales} sold
            </span>
          )}
        </div>

        {/* Categories */}
        {product.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.categories.slice(0, 2).map((category) => (
              <Badge 
                key={category.id} 
                variant="outline" 
                className="text-xs px-2 py-0.5 hover:bg-green-50 hover:border-green-200 transition-colors"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-2 mt-auto">
        <div className="w-full space-y-2">
          <Button
            id={`add-to-cart-${product.id}`}
            className={`
              w-full gap-2 transition-all duration-300 font-semibold
              ${product.stock_quantity <= 0 
                ? 'bg-gray-400 cursor-not-allowed opacity-60' 
                : isAddingToCart 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-green-600 hover:bg-green-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              ${product.stock_quantity > 0 ? 'transform hover:scale-105 active:scale-95' : ''}
            `}
            onClick={handleAddToCart}
            disabled={product.stock_quantity <= 0 || isAddingToCart}
            aria-label={`${t("product.addToCart")} ${product.name}`}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("product.adding")}
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                {product.stock_quantity <= 0 
                  ? t("product.outOfStock")
                  : t("product.addToCart")
                }
              </>
            )}
          </Button>

         
        </div>
      </CardFooter>

      {/* Ripple effect */}
   
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      <CardHeader className="p-4">
        <div className="space-y-2">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="h-6 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
        <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="w-full space-y-2">
          <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          <div className="h-8 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  );
}