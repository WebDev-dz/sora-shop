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
  name: "Sora Shop",
  logo: "/store.logo.png",
  phone: "+213 000 00 00 00",
  address: "Constantine",
  email:  "sorashop@tahnut-shop.com",
  facebook:  "https://web.facebook.com/profile.php?id=100067677527627"
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