"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations } from "@/lib/i18n/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "rtl" | "ltr"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // استخدام useState مع وظيفة تهيئة لتجنب مشاكل عدم تطابق الخادم/العميل
  const [language, setLanguageState] = useState<Language>(() => {
    // تشغيل هذا فقط على جانب العميل
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["ar", "fr", "en"].includes(savedLanguage)) {
        return savedLanguage
      }
    }
    return "ar" // اللغة الافتراضية
  })

  const [mounted, setMounted] = useState(false)

  // تعيين mounted إلى true بعد التحميل الأولي
  useEffect(() => {
    setMounted(true)
  }, [])

  // تحديث localStorage عند تغيير اللغة
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }

    // تحديث اتجاه المستند
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
  }

  // تحديث اتجاه المستند عند تغيير اللغة
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language])

  // الحصول على ترجمة لمفتاح معين
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language]
    }
    return key
  }

  // تحديد اتجاه النص بناءً على اللغة
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr"

  // تجنب مشاكل عدم تطابق الخادم/العميل
  const value = {
    language,
    setLanguage,
    t,
    dir,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
