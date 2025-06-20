export interface NavItem {
  href: string;
  label: string;
}

export interface Store {
  name: string;
  logo: string;
  phone: string;
  address: string;
  email: string;
  facebook: string;
}

export const store: Store = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Store Name",
  logo: process.env.NEXT_PUBLIC_STORE_LOGO || "/store.logo.png",
  phone: process.env.NEXT_PUBLIC_STORE_PHONE_NUMBER || "+213 000 00 00 00",
  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || "Address",
  email: process.env.NEXT_PUBLIC_STORE_EMAIL || "contact@example.com",
  facebook: process.env.NEXT_PUBLIC_STORE_FACEBOOK || "https://facebook.com/example"
};

export const navItems: NavItem[] = [
  {
    href: "/",
    label: "nav.home"
  },
  {
    href: "/products",
    label: "nav.products"
  },
  {
    href: "/categories",
    label: "nav.categories"
  },
  {
    href: "/about",
    label: "nav.about"
  },
  {
    href: "/contact",
    label: "nav.contact"
  }
]; 