"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Package,
  Mail,
  Clock,
  CreditCard,
  Truck,
  Download,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { useCartStore } from "@/components/cart-provider";
import { useEffect, useState, Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Order } from "@/types/orders";
import { useGetOrder } from "@/services/orders";

// Mock order data - in real app, this would come from your API

function OrderSummaryCard({ order }: { order: Order }) {
  const { t } = useLanguage();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">
            {t("checkout.orderSummary")}
          </CardTitle>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>{t("checkout.orderNumber")}: </span>
          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
            #{order.id}
          </code>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Items */}
        <div>
          <h3 className="font-medium mb-3">{t("checkout.items")}</h3>
          <div className="space-y-3">
            {order.line_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("checkout.quantity")}: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {item.price} {order.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-3">{t("checkout.orderDetails")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("checkout.status")}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {t(`checkout.status.${order.status}`)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("checkout.payment")}
                </span>
                <span>{order.payment_method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("checkout.total")}
                </span>
                <span className="font-medium">
                  {order.total} {order.currency}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">{t("checkout.delivery")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>{t("checkout.shippingTo")}</span>
              </div>
              <div className="text-sm">
                <p>{order.shipping.address_1}</p>
                <p>
                  {order.shipping.city}, {order.shipping.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ShareOrderButton({ orderId }: { orderId: number }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/order/${orderId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("checkout.orderConfirmation"),
          text: t("checkout.shareText"),
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {t("checkout.copied")}
        </>
      ) : (
        <>
          {typeof navigator !== "undefined" ? (
            <Share2 className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {t("checkout.share")}
        </>
      )}
    </Button>
  );
}

function CheckoutSuccessContent() {
  const { t } = useLanguage();
  const { clearCart } = useCartStore();
  const { data: order, mutate: getOrder } = useGetOrder();
  const searchParams = useSearchParams();
  const [orderDetails, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get order ID from URL params
  const orderId = searchParams?.get("order_id") || "ORD-2024-001";
  const paymentStatus = searchParams?.get("payment_status") || "completed";

  useEffect(() => {
    // Clear cart after successful order
    if (paymentStatus === "completed") {
      clearCart();
    }

    // Mock API call to get order details
    if (!isNaN(Number(orderId))) {
      getOrder(Number(orderId));

    }

  }, [orderId, paymentStatus, clearCart, t]);

  if (isLoading) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <p className="text-muted-foreground">{t("checkout.loadingOrder")}</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">
            {t("checkout.orderNotFound")}
          </h1>
          <p className="text-muted-foreground">
            {t("checkout.orderNotFoundDesc")}
          </p>
          <Link href="/">
            <Button>{t("nav.home")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8" dir={t("direction")}>
      {/* Success Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative">
          <CheckCircle className="h-20 w-20 text-green-500" />
          <div className="absolute inset-0 animate-ping">
            <CheckCircle className="h-20 w-20 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-700">
            {t("checkout.success.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            {t("checkout.success.subtitle")}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex justify-center">
        <OrderSummaryCard order={orderDetails} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button size="lg" className="min-w-[200px]">
              {t("nav.home")}
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              {t("checkout.continueShopping")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Additional Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t">
        <Link href={`/orders/${orderDetails.id}`}>
          <Button variant="ghost" size="sm">
            <Package className="h-4 w-4 mr-2" />
            {t("checkout.trackOrder")}
          </Button>
        </Link>

        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-2" />
          {t("checkout.downloadReceipt")}
        </Button>

        <ShareOrderButton orderId={orderDetails.id} />

        <Link href="/support">
          <Button variant="ghost" size="sm">
            {t("checkout.needHelp")}
          </Button>
        </Link>
      </div>

      {/* Next Steps */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {t("checkout.nextSteps")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">{t("checkout.step1.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("checkout.step1.desc")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">{t("checkout.step2.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("checkout.step2.desc")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">{t("checkout.step3.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("checkout.step3.desc")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorFallback() {
  const { t } = useLanguage();

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-destructive">
          {t("error.general")}
        </h1>
        <p className="text-muted-foreground">{t("error.tryAgainOrContact")}</p>
        <Link href="/">
          <Button>{t("nav.home")}</Button>
        </Link>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const { t } = useLanguage();

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
      <p className="text-muted-foreground">{t("common.loading")}</p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<LoadingFallback />}>
        <CheckoutSuccessContent />
      </Suspense>
    </ErrorBoundary>
  );
}
