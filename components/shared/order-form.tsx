"use client";

import React, { FormEvent, useCallback, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { City, Wilaya } from "@/types";

type OrderFormProps = {
  formData: {
    full_name: string;
    phone: string;
    address: string;
    wilaya: string;
    municipality: string;
  };
  errors: Partial<Record<keyof OrderFormProps["formData"] | "submit", string>>;
  loading: boolean;
  selectedVariation?: { attributes: { option: string }[] };
  wilayas: Wilaya[];
  cities: City[];
  selectedWilaya?: Wilaya;
  stockStatus?: { status: "instock" | "outofstock" };

  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: "wilaya" | "municipality", value: string) => void;
  onCancel?: () => void;
};

const OrderForm: React.FC<OrderFormProps> = ({
  formData,
  errors,
  loading,
  selectedVariation,
  wilayas,
  cities,
  selectedWilaya,
  stockStatus = { status: "instock" },
  onSubmit,
  onChange,
  onSelectChange,
  onCancel,
}) => {
  const { t, language } = useLanguage();

  // Ensure cities are filtered based on selected wilaya
  const [filteredCities, setFilteredCities] = React.useState<City[]>([]);

  useEffect(() => {
    const city =  (selectedWilaya ? cities.filter((c) => c.wilaya_name_ascii == selectedWilaya.name) : [])
   
    setFilteredCities(city);
  }, [cities, selectedWilaya]);


  return (
    <Card className="mt-4 border-primary">
      <CardHeader>
        <CardTitle>{t("checkout.quickCheckout")}</CardTitle>
        {selectedVariation && (
          <div className="text-sm text-muted-foreground">
            {t("product.selectedVariation")}:{" "}
            {selectedVariation.attributes.map((attr) => attr.option).join(", ")}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name">{t("checkout.fullName")}</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={onChange}
              required
              className={errors.full_name ? "border-red-500" : ""}
              placeholder={t("checkout.fullNamePlaceholder")}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t("checkout.phone")}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onChange}
              required
              className={errors.phone ? "border-red-500" : ""}
              placeholder={t("checkout.phonePlaceholder")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Wilaya + Municipality */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wilaya">{t("checkout.wilaya")}</Label>
              <Select
                value={formData.wilaya}
                onValueChange={(value) => onSelectChange("wilaya", value)}
                required
              >
                <SelectTrigger
                  id="wilaya"
                  className={errors.wilaya ? "border-red-500" : ""}
                >
                  <SelectValue placeholder={t("checkout.selectWilaya")} />
                </SelectTrigger>
                <SelectContent>
                  {wilayas.map((w) => (
                    <SelectItem key={w.id} value={w.id.toString()}>
                      {language === "ar" ? w.ar_name : w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.wilaya && (
                <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">{t("checkout.municipality")}</Label>
              <Select
                value={formData.municipality}
                onValueChange={(value) => onSelectChange("municipality", value)}
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
                  {filteredCities?.map((m, idx) => (
                    <SelectItem key={idx} value={m.id.toString()}>
                      {language === "ar" ? m.commune_name : m.commune_name_ascii}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.municipality && (
                <p className="text-red-500 text-sm mt-1">{errors.municipality}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">{t("checkout.address")}</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={onChange}
              required
              className={errors.address ? "border-red-500" : ""}
              placeholder={t("checkout.addressPlaceholder")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || stockStatus.status !== "instock"}
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
              <Button type="button" variant="outline" onClick={onCancel}>
                {t("common.cancel")}
              </Button>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
