"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useSWR from "swr"
import wilayasData from "@/lib/wilayas_comune.json" // Adjust path to your new JSON file
import { useCartStore } from "@/components/cart-provider"



interface ShippingRate {
  cost: string
}

interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image: string
}

const fetchShippingRate = async (wilaya: string) => {
  const response = await fetch(`/api/shipping?wilaya=${wilaya}`)
  const result = await response.json()
  if (result.status !== 200) throw new Error(result.error || "Failed to fetch shipping rate")
  return result.data
}
const createOrder = async (orderData: {
  payment_method: string
  payment_method_title: string
  set_paid: boolean
  billing: {
    full_name: string
    address_1?: string
    state: string
    country: string
    phone: string
  }
  shipping: {
    full_name: string
    address_1?: string
    state: string
    municipality: string
    country: string
  }
  line_items: { product_id: number; quantity: number }[]
}) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
  const result = await response.json()
  if (result.status !== 200) throw new Error(result.error || "Failed to create order")
  return result.data
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCartStore()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    wilaya: "",
    municipality: "",
  })
  
  // Set isBrowser to true once component mounts
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { data: shippingRate, error: shippingError } = useSWR<ShippingRate>(
    formData.wilaya ? `/api/shipping?wilaya=${formData.wilaya}` : null,
    () => fetchShippingRate(formData.wilaya)
  )
  const shippingCost = shippingError || !shippingRate ? 0 : parseFloat(shippingRate.cost)
  const wilayas = wilayasData

  // Find selected wilaya
  const selectedWilaya = wilayas.find((w) => w.wilaya_id.toString() === formData.wilaya)

  // Memoize municipalities to avoid re-computation
  const municipalities = useMemo(() => {
    return selectedWilaya ? selectedWilaya.municipalities : []
  }, [selectedWilaya])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset municipality when wilaya changes
      ...(name === "wilaya" ? { municipality: "" } : {}),
    }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.full_name.trim()) newErrors.full_name = t("checkout.errors.fullName")
    if (!formData.phone.trim()) newErrors.phone = t("checkout.errors.phone")
    if (!formData.address.trim()) newErrors.address = t("checkout.errors.address")
    if (!formData.wilaya) newErrors.wilaya = t("checkout.errors.wilaya")
    if (!formData.municipality) newErrors.municipality = t("checkout.errors.municipality")
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      await createOrder({
        payment_method: "cod",
        payment_method_title: t("checkout.cashOnDelivery"),
        set_paid: false,
        billing: {
          full_name: formData.full_name,
          address_1: formData.address,
          state: formData.wilaya,
          country: "DZ",
          phone: formData.phone,
        },
        shipping: {
          full_name: formData.full_name,
          address_1: formData.address,
          municipality: formData.municipality,
          state: formData.wilaya,
          country: "DZ",
        },
        line_items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      })

      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Error creating order:", error)
      setErrors({ submit: t("error.orderCreation") })
    } finally {
      setLoading(false)
    }
  }

  // Only redirect if we're in the browser
  if (isBrowser && cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container py-8 md:py-12" dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-8">{t("checkout.title")}</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("checkout.personalInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">{t("checkout.fullName")}</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className={errors.full_name ? "border-red-500" : ""}
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("checkout.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("checkout.shippingAddress")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">{t("checkout.address")}</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="wilaya">{t("checkout.wilaya")}</Label>
                    <Select
                      value={formData.wilaya}
                      onValueChange={(value) => handleSelectChange("wilaya", value)}
                      required
                    >
                      <SelectTrigger id="wilaya" className={errors.wilaya ? "border-red-500" : ""}>
                        <SelectValue placeholder={t("checkout.selectWilaya")} />
                      </SelectTrigger>
                      <SelectContent>
                        {wilayas.map((wilaya) => (
                          <SelectItem key={wilaya.wilaya_id} value={wilaya.wilaya_id.toString()}>
                            {language === "ar" ? wilaya.wilaya_name_ar : wilaya.wilaya_name_fr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.wilaya && <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipality">{t("checkout.municipality")}</Label>
                    <Select
                      value={formData.municipality}
                      onValueChange={(value) => handleSelectChange("municipality", value)}
                      disabled={!selectedWilaya}
                      required
                    >
                      <SelectTrigger
                        id="municipality"
                        className={errors.municipality ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder={t("checkout.selectMunicipality")} />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalities.map((mun, index) => (
                          <SelectItem key={index} value={mun.ar}>
                            {language === "ar" ? mun.ar : mun.fr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.municipality && (
                      <p className="text-red-500 text-sm mt-1">{errors.municipality}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">{t("checkout.address")}</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("checkout.processing") : t("checkout.confirmOrder")}
                </Button>
              </CardFooter>
            </Card>
            {errors.submit && <p className="text-red-500 text-sm mt-4">{errors.submit}</p>}
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("checkout.orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{(Number.parseFloat(item.price) * item.quantity).toFixed(2)} دج</span>
                  </div>
                ))}
                <Separator />
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
          </Card>
        </div>
      </div>
    </div>
  )
}