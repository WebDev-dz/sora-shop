"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Heart,
  Share2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-provider";
import { useCallback, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import wilayasData from "@/lib/wilaya.json";
import cities from "@/lib/cities.json";
import { useCartStore } from "@/components/cart-provider";
import { Pages } from "@/types";
import { Variation, VariationAttribute } from "@/types/variations";
import { useGetProduct } from "@/services/products";
import { useCreateOrder } from "@/services/orders";
import { useGetVariations } from "@/services/variations";

import { OrderForm } from "@/components/shared/order-form";
import ProductGallery from "@/components/shared/product-gellery";
import { OrderFormData } from "@/validations/order";
import { CreateOrder } from "@/types/orders";

type Props = Omit<Pages.ProductPage, "searchParams">;

export default function ProductPage({ params, initialData }: Props) {
  const { t, language } = useLanguage();
  const { addToCart } = useCartStore();
  const router = useRouter();

  const {
    data: product,
    isPending: productLoading,
    error: productError,
  } = useGetProduct();
  const {
    data: variations = [],
    isPending: variationsLoading,
    error: variationsError,
  } = useGetVariations();
  const { mutateAsync: createOrder, isPending: orderLoading } = useCreateOrder();

  // State management
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showVariationSelector, setShowVariationSelector] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    wilaya: "",
    municipality: "",
    quantity: 1,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get current product data (fallback to initialData if available)
  const currentProduct = product || initialData?.product;
  const currentVariations = variations || initialData?.variations;

  // Auto-select first variation for variable products (without showing UI)
  useEffect(() => {
    if (
      currentProduct?.type === "variable" &&
      currentVariations?.length &&
      !selectedVariation
    ) {
      const firstVariation = currentVariations[0];
      setSelectedVariation(firstVariation);
      const autoSelectedAttributes: { [key: string]: string } = {};
      firstVariation.attributes.forEach((attr: VariationAttribute) => {
        autoSelectedAttributes[attr.name] = attr.option;
      });
      setSelectedAttributes(autoSelectedAttributes);
    }
  }, [currentProduct, currentVariations, selectedVariation]);

  // Find matching variation when attributes change
  useEffect(() => {
    if (
      showVariationSelector &&
      currentVariations?.length &&
      Object.keys(selectedAttributes).length > 0
    ) {
      const matchingVariation = currentVariations.find((variation: Variation) =>
        variation.attributes.every(
          (varAttr: VariationAttribute) =>
            selectedAttributes[varAttr.name] === varAttr.option
        )
      );
      setSelectedVariation(matchingVariation || null);
    }
  }, [selectedAttributes, currentVariations, showVariationSelector]);

  const handleAttributeChange = useCallback(
    (attributeName: string, value: string) => {
      setSelectedAttributes((prev) => ({
        ...prev,
        [attributeName]: value,
      }));
    },
    []
  );

  const formatPrice = useCallback((price: string | number): string => {
    if (!price) return "";
    return `${price} ${t("currency")}`;
  }, []);

  const getCurrentPrice = useCallback((): string => {
    if (selectedVariation?.price) {
      return formatPrice(selectedVariation.price);
    }
    return currentProduct ? formatPrice(currentProduct.price) : "";
  }, [selectedVariation, currentProduct, formatPrice]);

  const getRegularPrice = useCallback((): string => {
    if (selectedVariation?.regular_price) {
      return formatPrice(selectedVariation.regular_price);
    }
    return currentProduct?.regular_price
      ? formatPrice(currentProduct.regular_price)
      : "";
  }, [selectedVariation, currentProduct, formatPrice]);

  const getStockStatus = useCallback((): {
    status: string;
    quantity: number;
  } => {
    if (selectedVariation) {
      return {
        status:
          selectedVariation.stock_status === "instock"
            ? "instock"
            : "outofstock",
        quantity: selectedVariation.stock_quantity || 0,
      };
    }
    return currentProduct
      ? {
          status:
            currentProduct.stock_status === "instock"
              ? "instock"
              : "outofstock",
          quantity: currentProduct.stock_quantity || 0,
        }
      : { status: "outofstock", quantity: 0 };
  }, [selectedVariation, currentProduct]);

  const handleBuyNowClick = useCallback(() => {
    if (currentProduct?.type === "variable" && currentVariations?.length > 1) {
      setShowVariationSelector(true);
      setShowCheckoutForm(true);
    } else {
      setShowCheckoutForm(true);
    }
  }, [currentProduct, currentVariations]);

  const handleVariationSelected = useCallback(() => {
    setShowCheckoutForm(true);
    setShowVariationSelector(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!currentProduct) return;

    const cartItem =
      currentProduct.type === "variable" && selectedVariation
        ? {
            id: selectedVariation.id,
            product_id: currentProduct.id,
            name: currentProduct.name,
            price: selectedVariation.price || currentProduct.price,
            images: selectedVariation.image
              ? [selectedVariation.image]
              : currentProduct.images,
            attributes: selectedVariation.attributes,
            quantity: 1,
          }
        : {
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            images: currentProduct.images,
            quantity: 1,
          };

    addToCart(cartItem);
    setErrors({});
  }, [currentProduct, selectedVariation, addToCart]);

  const handleAddToFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share && currentProduct) {
      try {
        await navigator.share({
          title: currentProduct.name,
          text: currentProduct.short_description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(t("product.shareCopied") || "Link copied!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  }, [currentProduct, t]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "wilaya" ? { municipality: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.full_name.trim())
      newErrors.full_name =
        t("checkout.errors.fullName") || "Full name is required";
    if (!formData.phone.trim())
      newErrors.phone = t("checkout.errors.phone") || "Phone is required";
    if (!formData.address.trim())
      newErrors.address = t("checkout.errors.address") || "Address is required";
    if (!formData.wilaya)
      newErrors.wilaya = t("checkout.errors.wilaya") || "Wilaya is required";
    if (!formData.municipality)
      newErrors.municipality =
        t("checkout.errors.municipality") || "Municipality is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleQuickCheckout = useCallback(
    async (data: OrderFormData) => {
      console.log({data});
      // if (!validateForm() || !currentProduct) return;

      // setLoadingCheckout(true);
      try {
        if (!currentProduct) return;
        const orderData: CreateOrder  = {
          payment_method: "bacs",
          payment_method_title: "Direct Bank Transfer",
          set_paid: true,

          shipping: {
            first_name: data.full_name.split(" ")[0] || data.full_name,
            last_name: data.full_name.split(" ").slice(1).join(" ") || "",
            address_1: data?.address || "",
            address_2: "",
            city: data.municipality,
            state: wilayas.find((w) => w.code.toString() === data.wilaya)?.ar_name || "",
            country: "Dz",
          },
          line_items: [
            { product_id: currentProduct?.id, quantity: data.quantity },
          ],
          shipping_lines: [],
        };

        createOrder(orderData).then((data) => {console.log(data);router.push(`/checkout/success?id=${data.id}`)}).catch(console.error);
      } catch (error) {
        console.error("Error creating order:", error);
        setErrors({
          submit: t("error.orderCreation") || "Error creating order",
        });
      } finally {
        // setLoadingCheckout(false);
      }
    },
    [
      validateForm,
      currentProduct,
      selectedVariation,
      formData,
      createOrder,
      router,
      t,
    ]
  );

  const wilayas = wilayasData;
  const selectedWilaya = useMemo(
    () => wilayas.find((w) => w.id.toString() === formData.wilaya),
    [formData.wilaya]
  );

  const stockStatus = getStockStatus();

  if (productLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">
              {t("loading") || "Loading product..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !currentProduct) {
    return (
      <div className="container py-12">
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-center">
            <h2 className="text-xl font-bold mb-2">
              {t("productNotFound") || "Product Not Found"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("productNotFoundDesc") ||
                "The product you're looking for doesn't exist or has been removed."}
            </p>
            <Button onClick={() => router.push("/products")} variant="outline">
              {t("backToProducts") || "Back to Products"}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="container py-8 md:py-12"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images with Swiper */}
        <ProductGallery
          images={currentProduct.images}
          productName={currentProduct.name}
        />

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{currentProduct.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="text-2xl font-bold text-primary">
                {getCurrentPrice()}
              </div>
              {getRegularPrice() && getCurrentPrice() !== getRegularPrice() && (
                <div className="text-lg text-muted-foreground line-through">
                  {getRegularPrice()}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {currentProduct.short_description && (
            <>
            
            <div className="text-muted-foreground">
              {parse(currentProduct.short_description)}
            </div>
            <Separator />
            </>
          )}


          {currentProduct.type === "variable" &&
            (variations?.length || 0) > 0 && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>
                    {t("product.selectOptions") || "Select Product Options"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleVariationSelected}
                    className="w-full"
                    disabled={!selectedVariation}
                  >
                    {t("product.confirmSelection") || "Confirm Selection"}
                  </Button>
                </CardContent>
              </Card>
            )}

          <div className="mt-2">
            {stockStatus.status === "instock" ? (
              <div className="text-sm text-blue-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                {t("product.inStock") || "In Stock"}
                {stockStatus.quantity > 0 &&
                  ` (${stockStatus.quantity} ${
                    t("product.products") || "available"
                  })`}
              </div>
            ) : (
              <div className="text-sm text-red-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                {t("product.outOfStock") || "Out of Stock"}
              </div>
            )}
          </div>

           
            <OrderForm
              formData={formData}
              errors={errors}
              loading={orderLoading}
              wilayas={wilayas}
              cities={cities}
              selectedWilaya={selectedWilaya}
              onSubmit={handleQuickCheckout}
            />
          

          {!showVariationSelector && (
            <div className="mt-6 flex flex-wrap gap-2 sm:flex-row">
              {/* <Button
                size="lg"
                className="gap-2 flex-1"
                onClick={handleBuyNowClick}
                disabled={stockStatus.status !== "instock"}
              >
                <ShoppingCart className="h-5 w-5" />
                {t("product.buyNow") || "Buy Now"}
              </Button> */}

              <Button
                size="lg"
                variant="outline"
                className="gap-2 flex-1"
                onClick={handleAddToCart}
                disabled={stockStatus.status !== "instock"}
              >
                <ShoppingCart className="h-5 w-5" />
                {t("product.addToCart") || "Add to Cart"}
              </Button>

              <Button
                size="lg"
                variant={isFavorite ? "default" : "outline"}
                className="gap-2"
                onClick={handleAddToFavorite}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">{t("product.share") || "Share"}</span>
              </Button>
            </div>
          )}

          {currentProduct.categories &&
            currentProduct.categories.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                {t("product.categories") || "Categories"}:{" "}
                {currentProduct.categories.map((category, index) => (
                  <span key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-primary hover:underline"
                    >
                      {category.name}
                    </Link>
                    {index < currentProduct.categories.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            )}
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="description">
              {t("product.description") || "Description"}
            </TabsTrigger>
            {/* <TabsTrigger value="additional_information">
              {t("product.additionalInfo") || "Additional Information"}
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              {currentProduct.description ? (
                parse(currentProduct.description)
              ) : (
                <p className="text-muted-foreground">
                  {t("product.noDescription") || "No description available."}
                </p>
              )}
            </div>
          </TabsContent>
          {/* <TabsContent value="additional_information" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              {currentProduct.attributes &&
              currentProduct.attributes.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {t("product.attributes") || "Product Attributes"}
                  </h3>
                  <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {currentProduct.attributes.map((attribute) => (
                      <div key={attribute.name} className="flex flex-col">
                        <dt className="font-medium text-muted-foreground">
                          {attribute.name}
                        </dt>
                        <dd className="mt-1">{attribute.options.join(", ")}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {t("product.noAdditionalInfo") ||
                    "No additional information available."}
                </p>
              )}
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
