"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, AlertCircle, Minus, Plus } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Wilaya, City } from "@/types";
import { OrderFormData, orderFormSchema } from "@/validations/order";


type OrderFormProps = {
  formData: OrderFormData;
  errors: Partial<Record<keyof OrderFormData | "submit", string>>;
  loading: boolean;
  selectedVariation?: { attributes: { option: string }[] };
  wilayas: Wilaya[];
  cities: City[];
  selectedWilaya?: Wilaya;
  stockStatus?: { status: "instock" | "outofstock" };
  maxQuantity?: number;

  onSubmit: (data: OrderFormData) => void;
  // onChange: (field: keyof OrderFormData, value: string | number) => void;
  onCancel?: () => void;
};

export const OrderForm: React.FC<OrderFormProps> = ({
  formData,
  errors,
  loading,
  selectedVariation,
  wilayas = [],
  cities = [],
  selectedWilaya,
  stockStatus = { status: "instock" },
  maxQuantity = 10,
  onSubmit,
  // onChange,
  onCancel,
}) => {
  const { t, language } = useLanguage();
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  useEffect(() => {
    const wilaya_code = form?.getValues("wilaya");
    console.log({wilaya_code});
    console.log({ cities })
    const filtered = cities?.filter((c) => Number(c.wilaya_code) == Number(wilaya_code));
      
      console.log({filtered});
    setFilteredCities(filtered);
  }, [form.watch("wilaya"), cities]);

  const isOutOfStock = stockStatus.status === "outofstock";

  return (
    <Card className="mt-4 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t("checkout.quickCheckout")}
          {isOutOfStock && (
            <Alert className="ml-auto max-w-fit border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 text-sm">
                Out of Stock
              </AlertDescription>
            </Alert>
          )}
        </CardTitle>

        {selectedVariation && (
          <div className="text-sm text-muted-foreground">
            {t("product.selectedVariation")}:{" "}
            <span className="font-medium">
              {selectedVariation.attributes.map((attr) => attr.option).join(", ")}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Full Name */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("checkout.fullName")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("checkout.fullNamePlaceholder")} {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("checkout.phone")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder={t("checkout.phonePlaceholder")} {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("checkout.quantity")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const value = Math.max(field.value - 1, 1);
                        field.onChange(value);
                        
                      }}
                      disabled={field.value <= 1 || loading || isOutOfStock}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min={1}
                      max={maxQuantity}
                      value={field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        field.onChange(value);
                        
                      }}
                      className="w-20 text-center"
                      disabled={loading || isOutOfStock}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const value = Math.min(field.value + 1, maxQuantity);
                        field.onChange(value);
                        
                      }}
                      disabled={field.value >= maxQuantity || loading || isOutOfStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum quantity: {maxQuantity}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Wilaya */}
            <FormField
              control={form.control}
              name="wilaya"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("checkout.wilaya")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                     
                    }}
                    value={field.value}
                    disabled={loading || isOutOfStock}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("checkout.selectWilaya")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wilayas.map((w) => (
                        <SelectItem key={w.id} value={w.code.toString()}>
                          {language === "ar" ? w.ar_name : w.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Municipality */}
            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("checkout.municipality")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                     
                    }}
                    value={field.value}
                    disabled={!form.watch("wilaya") || loading || isOutOfStock}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("checkout.selectMunicipality")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredCities.map((m) => (
                        <SelectItem key={m.id} value={m.commune_name.toString()}>
                          {language === "ar" ? m.commune_name : m.commune_name_ascii}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("checkout.address")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("checkout.addressPlaceholder")}
                      {...field}
                      disabled={loading || isOutOfStock}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Error */}
            {errors.submit && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {errors.submit}
                </AlertDescription>
              </Alert>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading || isOutOfStock}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("checkout.processing")}
                  </>
                ) : (
                  t("checkout.confirmOrder")
                )}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={loading}
                  size="lg"
                >
                  {t("common.cancel")}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
