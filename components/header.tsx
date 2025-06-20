"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { useCartStore } from "./cart-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { store, navItems, type NavItem } from "@/lib/variables";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCartStore();
  const { t, dir } = useLanguage();
  const router = useRouter();

  const totalItems = cart.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={t("nav.menu")}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        <Avatar className="size-12">
          <Image
            src={store.logo}
            alt={store.name}
            width={48}
            height={48}
            className="size-12 object-cover"
          />
        </Avatar>
        {/* Logo */}
        <div className="mx-3 sm:mx-4 md:mx-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold sm:text-xl">
              {store.name}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 gap-3 items-center justify-center space-x-4 lg:space-x-6 space-x-reverse">
          {navItems.map((item: NavItem) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        {/* Desktop Search and Actions */}
        <div className="flex items-center flex-1 justify-end space-x-2 sm:space-x-3 space-x-reverse">
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex w-full max-w-xs lg:max-w-sm mx-4"
          >
            <div className="relative w-full">
              <Search
                className={`absolute ${
                  dir === "rtl" ? "right-2.5" : "left-2.5"
                } top-2.5 h-4 w-4 text-muted-foreground`}
              />
              <Input
                type="search"
                placeholder={t("search.placeholder")}
                className={`w-full rounded-md bg-background ${
                  dir === "rtl" ? "pr-8" : "pl-8"
                } text-sm`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSearch}
            aria-label={t("search.toggle")}
          >
            <Search className="h-5 w-5" />
          </Button>

          <LanguageSwitcher />
          <ModeToggle />

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span
                  className={`absolute ${
                    dir === "rtl" ? "-top-2 -left-2" : "-top-2 -right-2"
                  } flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground`}
                >
                  {totalItems}
                </span>
              )}
              <span className="sr-only">{t("cart.title")}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu and Search */}
      <div
        className={`${
          isMenuOpen || isSearchOpen ? "block" : "hidden"
        } lg:hidden bg-background border-b transition-all duration-300 ease-in-out`}
      >
        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="p-4">
            <form onSubmit={handleSearch} className="relative">
              <Search
                className={`absolute ${
                  dir === "rtl" ? "right-2.5" : "left-2.5"
                } top-2.5 h-4 w-4 text-muted-foreground`}
              />
              <Input
                type="search"
                placeholder={t("search.placeholder")}
                className={`w-full rounded-md bg-background ${
                  dir === "rtl" ? "pr-8" : "pl-8"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item: NavItem) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
