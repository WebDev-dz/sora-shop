"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Decorative blur background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 -left-10 h-96 w-96 rounded-full bg-green-200 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-300 opacity-20 blur-2xl"></div>
      </div>

      <div className="container px-4 md:px-6 my-6 space-y-3">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl !leading-[6.5rem] font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              {t("hero.title")}
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-gray-700 md:text-xl lg:text-lg xl:text-xl">
              {t("hero.description")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 transition">
                  {t("hero.shopNow")}
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="hover:border-green-500">
                  {t("hero.exploreCategories")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center animate-fade-in-up">
            <Image
              alt={t("store.title")}
              className="rounded-2xl shadow-lg object-cover aspect-[16/10] w-full max-w-md"
              src="/landing.image.png"
              width={550}
              height={310}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
