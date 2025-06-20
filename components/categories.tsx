"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { CategoryItem } from "@/types/categories";
import { useGetCategories } from "@/services/categories";
import { CategoryGrid } from "./shared/category-card";

type Props = {
  initialData?: { categories: CategoryItem[] }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function Categories({initialData, searchParams}: Props) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Fetch categories using useSWR
  const { data: categories = initialData?.categories , error, isPending: isLoading } = useGetCategories()

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {mounted ? t("categories.title") : "تصفح حسب الفئات"}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {mounted ? t("categories.description") : "اكتشف منتجاتنا المصنفة حسب الفئات"}
            </p>
          </div>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <CategoryGrid  skeletonCount={6} loading={true} />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">
                {mounted ? t("error") : "حدث خطأ"}
              </h2>
              <p>{mounted ? t("error.fetchCategories") : "فشل في جلب الفئات"}</p>
            </div>
          ) : categories?.length === 0 ? (
            <div className="text-center py-8">
              <p>{mounted ? t("noCategories") : "لا توجد فئات متاحة حاليًا"}</p>
            </div>
          ) : (
              <CategoryGrid categories={categories}  />
            
          )}
        </div>

        <div className="flex justify-center mt-24">
          <Link href="/categories" className="text-primary hover:underline">
            {mounted ? t("categories.viewAll") : "عرض جميع الفئات"}
          </Link>
        </div>
      </div>
    </section>
  );
}

