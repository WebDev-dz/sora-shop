"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Facebook, Home, ShoppingBag, LayoutGrid, Info, MapPin, Phone, Mail } from "lucide-react"
import { store } from "@/lib/variables"

export function Footer() {
  const { t, language } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  // Check if current language is RTL (Arabic)
  const isRTL = language === "ar"
  
  return (
    <footer className={`border-t bg-muted/40 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-4">{store.name}</h3>
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
            <div className="mt-4 flex items-center">
              <a
                href="https://web.facebook.com/profile.php?id=100067677527627"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <Facebook size={16} />
                {store.facebook}
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Home size={16} />
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <ShoppingBag size={16} />
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <LayoutGrid size={16} />
                  {t("nav.categories")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Info size={16} />
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground flex items-center gap-2">
                <MapPin size={16} />
                <div>
                  <span>{store.address}</span>{" "}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t("store.address"))}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-foreground hover:underline"
                  >
                    {t("store.address")}
                  </a>
                </div>
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                <Phone size={16} />
                <div>
                  <span>{store.phone}</span>{" "}
                </div>
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                <Mail size={16} />
                <div>
                  <span>{store.email}</span>{" "}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {store.name}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}