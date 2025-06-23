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
  name: process.env.STORE_NAME || "Store Name",
  logo: process.env.STORE_LOGO || "/store.logo.png",
  phone: process.env.STORE_PHONE_NUMBER || "+213 000 00 00 00",
  address: process.env.STORE_ADDRESS || "Address",
  email: process.env.STORE_EMAIL || "contact@example.com",
  facebook: process.env.STORE_FACEBOOK || "https://web.facebook.com/profile.php?id=100067677527627"
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