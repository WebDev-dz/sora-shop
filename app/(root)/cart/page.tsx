"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import useSWR from "swr"

interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
}

interface ShippingRate {
  cost: string
}

const fetchShippingRate = async () => {
  const response = await fetch("/api/shipping")
  const result = await response.json()
  if (result.status !== 200) throw new Error(result.error || "Failed to fetch shipping rate")
  return result.data
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartStore()
  const { t } = useLanguage()
  const { data: shippingRate, error: shippingError } = useSWR<ShippingRate>("/api/shipping", fetchShippingRate)

  const shippingCost = shippingError || !shippingRate ? 1000 : parseFloat(shippingRate.cost)

  if (cart.length === 0) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t("cart.empty")}</h1>
        <p className="text-muted-foreground mb-6">{t("cart.emptyDescription")}</p>
        <Link href="/products">
          <Button>{t("cart.browseProducts")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("nav.products")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center p-4 border-b last:border-0"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-muted ltr:mr-4 rtl:ml-4 rounded-md overflow-hidden mb-4 sm:mb-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>

                  <div className="flex-grow sm:mr-4 mb-4 sm:mb-0">
                    <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                      {item.name}
                    </Link>
                    <div className="text-muted-foreground">{item.price} دج</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">{t("cart.decreaseQuantity")}</span>
                    </Button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">{t("cart.increaseQuantity")}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">{t("cart.remove")}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("cart.summary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{t("cart.subtotal")}</span>
                  <span>{totalPrice.toFixed(2)} دج</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("cart.shipping")}</span>
                  <span>{shippingCost.toFixed(2)} دج</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>{t("cart.total")}</span>
                  <span>{(totalPrice + shippingCost).toFixed(2)} دج</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/checkout" className="w-full">
                <Button className="w-full">{t("cart.checkout")}</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}