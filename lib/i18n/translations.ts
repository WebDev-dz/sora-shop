export type Language = "ar" | "fr" | "en";

export type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Language file (e.g., translations.ts)
export const translations: Translations = {
  // Store
  "store.title": {
    ar: "Ménage Bazita",
    fr: "Ménage Bazita",
    en: "Ménage Bazita",
  },
  "currency": {
    ar: "دج",
    fr: "DA",
    en: "DA",
  },
  "store.phoneLabel": {
    ar: "رقم الهاتف:",
    fr: "Téléphone:",
    en: "Phone:",
  },
  "store.phoneNumber": {
    ar: "+213 774 66 22 57",
    fr: "+213 774 66 22 57",
    en: "+213 774 66 22 57",
  },
  "store.addressLabel": {
    ar: "العنوان:",
    fr: "Adresse:",
    en: "Address:",
  },
  "store.address": {
    ar: "14 Rue ourif hadj mohamed bab el oued, Algiers, Algeria",
    fr: "14 Rue ourif hadj mohamed bab el oued, Algiers, Algeria",
    en: "14 Rue ourif hadj mohamed bab el oued, Algiers, Algeria",
  },
  "store.emailLabel": {
    ar: "البريد الإلكتروني:",
    fr: "Email:",
    en: "Email:",
  },
  "store.email": {
    ar: "contact@menage-bazita.com",
    fr: "contact@menage-bazita.com",
    en: "contact@menage-bazita.com",
  },
  "store.facebook": {
    ar: "الفايسبوك",
    fr: "Facebook",
    en: "Facebook",
  },

  // Header
  "nav.home": {
    ar: "الرئيسية",
    fr: "Accueil",
    en: "Home",
  },

  "nav.products": {
    ar: "المنتجات",
    fr: "Produits",
    en: "Products",
  },
  "nav.categories": {
    ar: "الفئات",
    fr: "Catégories",
    en: "Categories",
  },
  "nav.about": {
    ar: "من نحن",
    fr: "À propos",
    en: "About",
  },
  "nav.contact": {
    ar: "اتصل بنا",
    fr: "Contact",
    en: "Contact",
  },
  "search.placeholder": {
    ar: "بحث...",
    fr: "Rechercher...",
    en: "Search...",
  },
  "cart.title": {
    ar: "عربة التسوق",
    fr: "Panier",
    en: "Cart",
  },
  "account.title": {
    ar: "حسابي",
    fr: "Mon compte",
    en: "My Account",
  },
  "theme.toggle": {
    ar: "تبديل السمة",
    fr: "Basculer le thème",
    en: "Toggle theme",
  },
  "theme.light": {
    ar: "فاتح",
    fr: "Clair",
    en: "Light",
  },
  "theme.dark": {
    ar: "داكن",
    fr: "Sombre",
    en: "Dark",
  },
  "theme.system": {
    ar: "تلقائي",
    fr: "Système",
    en: "System",
  },

  // Home page
  "hero.title": {
    ar: "أهلاً بك في متجر الجزائر الإلكتروني",
    fr: "Bienvenue à la boutique en ligne d'Algérie",
    en: "Welcome to Algeria Online Store",
  },
  "hero.description": {
    ar: "اكتشف تشكيلة واسعة من المنتجات عالية الجودة بأسعار تنافسية. تسوق الآن واستمتع بتجربة تسوق فريدة.",
    fr: "Découvrez une large gamme de produits de haute qualité à des prix compétitifs. Achetez maintenant et profitez d'une expérience de magasinage unique.",
    en: "Discover a wide range of high-quality products at competitive prices. Shop now and enjoy a unique shopping experience.",
  },
  "hero.shopNow": {
    ar: "تسوق الآن",
    fr: "Acheter maintenant",
    en: "Shop Now",
  },
  "hero.exploreCategories": {
    ar: "استكشف الفئات",
    fr: "Explorer les catégories",
    en: "Explore Categories",
  },
  "featured.title": {
    ar: "منتجات مميزة",
    fr: "Produits en vedette",
    en: "Featured Products",
  },
  "featured.description": {
    ar: "اكتشف أحدث المنتجات المميزة في متجرنا",
    fr: "Découvrez les derniers produits en vedette dans notre boutique",
    en: "Discover the latest featured products in our store",
  },
  "featured.viewAll": {
    ar: "عرض جميع المنتجات",
    fr: "Voir tous les produits",
    en: "View all products",
  },
  "categories.title": {
    ar: "تصفح حسب الفئات",
    fr: "Parcourir par catégories",
    en: "Browse by Categories",
  },
  "categories.description": {
    ar: "اكتشف منتجاتنا المصنفة حسب الفئات",
    fr: "Découvrez nos produits classés par catégories",
    en: "Discover our products classified by categories",
  },
  "categories.viewAll": {
    ar: "عرض جميع الفئات",
    fr: "Voir toutes les catégories",
    en: "View all categories",
  },

  // Products
  "product.addToCart": {
    ar: "إضافة إلى السلة",
    fr: "Ajouter au panier",
    en: "Add to Cart",
  },
  "product.products": {
    ar: "منتج",
    fr: "produit",
    en: "product",
  },
  "product.inStock": {
    ar: "متوفر",
    fr: "En stock",
    en: "In Stock",
  },
  "product.outOfStock": {
    ar: "غير متوفر",
    fr: "En rupture de stock",
    en: "Out of Stock",
  },
  loading: {
    ar: "جاري التحميل...",
    fr: "Chargement...",
    en: "Loading...",
  },
  error: {
    ar: "حدث خطأ",
    fr: "Une erreur s'est produite",
    en: "An error occurred",
  },
  "error.fetchProducts": {
    ar: "فشل في جلب المنتجات",
    fr: "Échec de la récupération des produits",
    en: "Failed to fetch products",
  },
  noProducts: {
    ar: "لا توجد منتجات متاحة حاليًا",
    fr: "Aucun produit disponible pour le moment",
    en: "No products available at the moment",
  },

  // Categories
  "error.fetchCategory": {
    ar: "فشل في جلب الفئة أو المنتجات",
    fr: "Échec de la récupération de la catégorie ou des produits",
    en: "Failed to load category or products",
  },
  noCategory: {
    ar: "الفئة غير موجودة",
    fr: "Catégorie introuvable",
    en: "Category not found",
  },
  "category.description": {
    ar: "تصفح مجموعتنا الواسعة من المنتجات عالية الجودة في هذه الفئة.",
    fr: "Découvrez notre large gamme de produits de haute qualité dans cette catégorie.",
    en: "Browse our wide range of high-quality products in this category.",
  },

  // About Page
  "about.title": {
    ar: "من نحن",
    fr: "À propos de nous",
    en: "About Us",
  },
  "about.description": {
    ar: "تعرف على قصتنا ورسالتنا وقيمنا.",
    fr: "Découvrez notre histoire, notre mission et nos valeurs.",
    en: "Learn more about our story, mission, and values.",
  },
  "about.mission.title": {
    ar: "مهمتنا",
    fr: "Notre mission",
    en: "Our Mission",
  },
  "about.mission.description": {
    ar: "نحن ملتزمون بتوفير منتجات عالية الجودة تعزز حياة عملائنا، مع التركيز على الابتكار والاستدامة.",
    fr: "Nous nous engageons à fournir des produits de haute qualité qui améliorent la vie de nos clients, en mettant l'accent sur l'innovation et la durabilité.",
    en: "We are dedicated to providing high-quality products that enhance the lives of our customers, with a focus on innovation and sustainability.",
  },
  "about.story.title": {
    ar: "قصتنا",
    fr: "Notre histoire",
    en: "Our Story",
  },
  "about.story.description": {
    ar: "تأسس متجرنا في عام 2020 برؤية لجلب أفضل المنتجات إلى السوق الجزائري. اليوم، نحن فخورون بخدمة آلاف العملاء بمجموعة واسعة من العروض.",
    fr: "Fondée en 2020, notre boutique a débuté avec la vision d'apporter les meilleurs produits sur le marché algérien. Aujourd'hui, nous sommes fiers de servir des milliers de clients avec une large gamme d'offres.",
    en: "Founded in 2020, our company started with a vision to bring the best products to the Algerian market. Today, we are proud to serve thousands of customers with a wide range of offerings.",
  },
  "about.values.title": {
    ar: "قيمنا",
    fr: "Nos valeurs",
    en: "Our Values",
  },
  "about.values.quality": {
    ar: "الجودة: نسعى للتميز في كل منتج نقدمه.",
    fr: "Qualité : Nous visons l'excellence dans chaque produit que nous proposons.",
    en: "Quality: We strive for excellence in every product we offer.",
  },
  "about.values.customer": {
    ar: "التركيز على العميل: رضاكم هو أولويتنا القصوى.",
    fr: "Orientation client : Votre satisfaction est notre priorité absolue.",
    en: "Customer Focus: Your satisfaction is our top priority.",
  },
  "about.values.integrity": {
    ar: "النزاهة: نعمل بأمانة وشفافية.",
    fr: "Intégrité : Nous opérons avec honnêteté et transparence.",
    en: "Integrity: We operate with honesty and transparency.",
  },

  // Contact Page
  "contact.title": {
    ar: "اتصل بنا",
    fr: "Contactez-nous",
    en: "Contact Us",
  },
  "contact.description": {
    ar: "تواصلوا معنا لأي استفسارات أو دعم.",
    fr: "Contactez-nous pour toute question ou assistance.",
    en: "Get in touch with us for any questions or support.",
  },
  "contact.name": {
    ar: "الاسم",
    fr: "Nom",
    en: "Name",
  },
  "contact.email": {
    ar: "البريد الإلكتروني",
    fr: "Email",
    en: "Email",
  },
  "contact.message": {
    ar: "الرسالة",
    fr: "Message",
    en: "Message",
  },
  "contact.submit": {
    ar: "إرسال الرسالة",
    fr: "Envoyer le message",
    en: "Send Message",
  },
  "contact.sending": {
    ar: "جاري الإرسال...",
    fr: "Envoi en cours...",
    en: "Sending...",
  },
  "contact.success": {
    ar: "تم إرسال رسالتك بنجاح!",
    fr: "Votre message a été envoyé avec succès !",
    en: "Your message has been sent successfully!",
  },
  "contact.error": {
    ar: "فشل في إرسال الرسالة. الرجاء المحاولة مرة أخرى.",
    fr: "Échec de l'envoi du message. Veuillez réessayer.",
    en: "Failed to send message. Please try again.",
  },

  // Footer
  "footer.description": {
    ar: "متجرك الإلكتروني المفضل للتسوق في الجزائر. نقدم منتجات عالية الجودة بأسعار تنافسية.",
    fr: "Votre boutique en ligne préférée pour faire du shopping en Algérie. Nous proposons des produits de haute qualité à des prix compétitifs.",
    en: "Your favorite online store for shopping in Algeria. We offer high-quality products at competitive prices.",
  },
  "footer.quickLinks": {
    ar: "روابط سريعة",
    fr: "Liens rapides",
    en: "Quick Links",
  },
  "footer.customerService": {
    ar: "خدمة العملاء",
    fr: "Service client",
    en: "Customer Service",
  },
  "footer.faq": {
    ar: "الأسئلة الشائعة",
    fr: "FAQ",
    en: "FAQ",
  },
  "footer.shipping": {
    ar: "سياسة الشحن",
    fr: "Politique d'expédition",
    en: "Shipping Policy",
  },
  "footer.returns": {
    ar: "سياسة الإرجاع",
    fr: "Politique de retour",
    en: "Returns Policy",
  },
  "footer.contactUs": {
    ar: "تواصل معنا",
    fr: "Contactez-nous",
    en: "Contact Us",
  },
  "footer.address": {
    ar: "العنوان: الجزائر العاصمة، الجزائر",
    fr: "Adresse: Alger, Algérie",
    en: "Address: Algiers, Algeria",
  },
  
 
  "footer.copyright": {
    ar: "جميع الحقوق محفوظة.",
    fr: "Tous droits réservés.",
    en: "All rights reserved.",
  },

  // Cart
  "cart.empty": {
    ar: "سلة التسوق فارغة",
    fr: "Votre panier est vide",
    en: "Your cart is empty",
  },
  "cart.emptyDescription": {
    ar: "لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.",
    fr: "Vous n'avez pas encore ajouté de produits à votre panier.",
    en: "You haven't added any products to your cart yet.",
  },
  "cart.browseProducts": {
    ar: "تصفح المنتجات",
    fr: "Parcourir les produits",
    en: "Browse Products",
  },
  "cart.summary": {
    ar: "ملخص الطلب",
    fr: "Résumé de la commande",
    en: "Order Summary",
  },
  "cart.subtotal": {
    ar: "المجموع الفرعي",
    fr: "Sous-total",
    en: "Subtotal",
  },
  "cart.shipping": {
    ar: "الشحن",
    fr: "Livraison",
    en: "Shipping",
  },
  "cart.total": {
    ar: "الإجمالي",
    fr: "Total",
    en: "Total",
  },
  "cart.checkout": {
    ar: "متابعة الدفع",
    fr: "Passer à la caisse",
    en: "Checkout",
  },

  // Checkout
  "checkout.title": {
    ar: "إتمام الطلب",
    fr: "Finaliser la commande",
    en: "Checkout",
  },
  "checkout.personalInfo": {
    ar: "معلومات الشخصية",
    fr: "Informations personnelles",
    en: "Personal Information",
  },
  "checkout.firstName": {
    ar: "الاسم الأول",
    fr: "Prénom",
    en: "First Name",
  },
  "checkout.lastName": {
    ar: "اسم العائلة",
    fr: "Nom de famille",
    en: "Last Name",
  },
  "checkout.email": {
    ar: "البريد الإلكتروني",
    fr: "Email",
    en: "Email",
  },
  "checkout.phone": {
    ar: "رقم الهاتف",
    fr: "Numéro de téléphone",
    en: "Phone Number",
  },
  "checkout.phonePlaceholder": {
    ar: "أدخل رقم هاتفك",
    fr: "Entrez votre numéro de téléphone",
    en: "Enter your phone number",
  },
  "checkout.shippingAddress": {
    ar: "عنوان الشحن",
    fr: "Adresse de livraison",
    en: "Shipping Address",
  },
  "checkout.address": {
    ar: "العنوان",
    fr: "Adresse",
    en: "Address",
  },
  "checkout.addressPlaceholder": {
    ar: "أدخل عنوانك الكامل",
    fr: "Entrez votre adresse complète",
    en: "Enter your complete address",
  },
  "checkout.city": {
    ar: "المدينة",
    fr: "Ville",
    en: "City",
  },
  "checkout.wilaya": {
    ar: "الولاية",
    fr: "Wilaya",
    en: "Province",
  },
  "checkout.selectWilaya": {
    ar: "اختر الولاية",
    fr: "Sélectionnez la wilaya",
    en: "Select province",
  },
  "checkout.postcode": {
    ar: "الرمز البريدي",
    fr: "Code postal",
    en: "Postal Code",
  },
  "checkout.notes": {
    ar: "ملاحظات إضافية (اختياري)",
    fr: "Notes supplémentaires (facultatif)",
    en: "Additional Notes (optional)",
  },
  "checkout.paymentMethod": {
    ar: "طريقة الدفع",
    fr: "Mode de paiement",
    en: "Payment Method",
  },
  "checkout.cashOnDelivery": {
    ar: "الدفع عند الاستلام",
    fr: "Paiement à la livraison",
    en: "Cash on Delivery",
  },
  "checkout.bankTransfer": {
    ar: "التحويل البنكي",
    fr: "Virement bancaire",
    en: "Bank Transfer",
  },
  "checkout.confirmOrder": {
    ar: "تأكيد الطلب",
    fr: "Confirmer la commande",
    en: "Confirm Order",
  },
  "checkout.processing": {
    ar: "جاري معالجة الطلب...",
    fr: "Traitement de la commande...",
    en: "Processing order...",
  },
  "checkout.orderSummary": {
    ar: "ملخص الطلب",
    fr: "Résumé de la commande",
    en: "Order Summary",
  },

  "product.addToWishlist": {
    ar: "أضف للمفضلة",
    fr: "Ajouter aux favoris",
    en: "Add to Wishlist",
  },
  "product.share": {
    ar: "مشاركة",
    fr: "Partager",
    en: "Share",
  },
  "product.categories": {
    ar: "الفئات",
    fr: "Catégories",
    en: "Categories",
  },
  "product.description": {
    ar: "الوصف",
    fr: "Description",
    en: "Description",
  },
  "product.additionalInfo": {
    ar: "معلومات إضافية",
    fr: "Informations supplémentaires",
    en: "Additional Information",
  },
  "product.noAdditionalInfo": {
    ar: "لا توجد معلومات إضافية لهذا المنتج",
    fr: "Aucune information supplémentaire pour ce produit",
    en: "No additional information for this product",
  },
  productNotFound: {
    ar: "المنتج غير موجود",
    fr: "Produit introuvable",
    en: "Product Not Found",
  },
  productNotFoundDesc: {
    ar: "هذا المنتج غير متوفر أو تم حذفه.",
    fr: "Ce produit n'est pas disponible ou a été supprimé.",
    en: "This product is not available or has been deleted.",
  },
  "product.shareCopied": {
    ar: "تم نسخ الرابط!",
    fr: "Lien copié !",
    en: "Link copied!",
  },
  "checkout.fullName": {
    ar: "الاسم الكامل",
    fr: "Nom complet",
    en: "Full Name",
  },
  "checkout.fullNamePlaceholder": {
    ar: "أدخل اسمك الكامل",
    fr: "Entrez votre nom complet",
    en: "Enter your full name",
  },
  "error.orderCreation": {
    ar: "حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.",
    fr: "Une erreur s'est produite lors de la création de la commande. Veuillez réessayer.",
    en: "An error occurred while creating the order. Please try again.",
  },

  "error.title": {
    ar: "حدث خطأ",
    fr: "Une erreur s'est produite",
    en: "An error occurred",
  },

  "featured.noProducts": {
    ar: "لا توجد منتجات مميزة متاحة حاليًا",
    fr: "Aucun produit en vedette disponible pour le moment",
    en: "No featured products available at the moment",
  },
  "products.description": {
    ar: "تصفح مجموعتنا الواسعة من المنتجات عالية الجودة",
    fr: "Parcourez notre vaste collection de produits de haute qualité",
    en: "Browse our wide collection of high-quality products",
  },
  "pagination.previous": {
    ar: "السابق",
    fr: "Précédent",
    en: "Previous",
  },
  "pagination.next": {
    ar: "التالي",
    fr: "Suivant",
    en: "Next",
  },
  "pagination.page": {
    ar: "الصفحة ",
    fr: "Page ",
    en: "Page ",
  },
  "checkout.municipality": {
    ar: "البلدية",
    fr: "Commune",
    en: "Municipality",
  },
  "checkout.selectMunicipality": {
    ar: "اختر البلدية",
    fr: "Sélectionner une commune",
    en: "Select a municipality",
  },
  "checkout.errors.municipality": {
    ar: "البلدية مطلوبة",
    fr: "La commune est requise",
    en: "Municipality is required",
  },
  "checkout.errors.city": {
    ar: "المدينة مطلوبة",
    fr: "La ville est requise",
    en: "City is required",
  },
  "checkout.errors.fullName": {
    ar: "الاسم الكامل مطلوب",
    fr: "Le nom complet est requis",
    en: "Full name is required",
  },
  "checkout.errors.phone": {
    ar: "رقم الهاتف مطلوب",
    fr: "Le numéro de téléphone est requis",
    en: "Phone number is required",
  },
  "checkout.errors.address": {
    ar: "العنوان مطلوب",
    fr: "L'adresse est requise",
    en: "Address is required",
  },
  "checkout.errors.wilaya": {
    ar: "الولاية مطلوبة",
    fr: "La wilaya est requise",
    en: "State/province is required",
  },

  "product.buyNow": {
    ar: "اشتر الآن",
    fr: "Acheter maintenant",
    en: "Buy Now",
  },

  "checkout.quickCheckout": {
    ar: "إتمام الشراء السريع",
    fr: "Paiement rapide",
    en: "Quick Checkout",
  },

  // Product Details
  "product.specifications": {
    ar: "المواصفات",
    fr: "Spécifications",
    en: "Specifications",
  },
  "product.reviews": {
    ar: "التقييمات",
    fr: "Avis",
    en: "Reviews",
  },
  "product.relatedProducts": {
    ar: "منتجات ذات صلة",
    fr: "Produits connexes",
    en: "Related Products",
  },
  "product.quantity": {
    ar: "الكمية",
    fr: "Quantité",
    en: "Quantity",
  },
  "product.availability": {
    ar: "التوفر",
    fr: "Disponibilité",
    en: "Availability",
  },
  "products.noProductsAvailable": {
    ar: "لا توجد منتجات متاحة حالياً",
    fr: "Aucun produit disponible",
    en: "No products available",
  },
  "products.adjustFilters": {
    ar: "حاول تعديل البحث أو الفلاتر",
    fr: "Essayez d'ajuster votre recherche ou les filtres",
    en: "Try adjusting your search or filters",
  },
  "products.searchPlaceholder": {
    ar: "ابحث عن المنتجات...",
    fr: "Rechercher des produits...",
    en: "Search products...",
  },

  // Filters
  "filters.clear": {
    ar: "مسح الفلاتر",
    fr: "Réinitialiser les filtres",
    en: "Clear Filters",
  },
  "filters.filteredResults": {
    ar: "نتائج مفلترة",
    fr: "Résultats filtrés",
    en: "Filtered results",
  },

  
  "pagination.pageInfo": {
    ar: "الصفحة {{currentPage}} من {{totalPages}} • {{totalProducts}} منتجًا",
    fr: "Page {{currentPage}} sur {{totalPages}} • {{totalProducts}} produits",
    en: "Page {{currentPage}} of {{totalPages}} • {{totalProducts}} total products",
  },
  // Sort options
  "sort.name": {
    ar: "الاسم: من أ إلى ي",
    fr: "Nom A-Z",
    en: "Name A-Z",
  },
  "sort.price-low": {
    ar: "السعر: من الأقل للأعلى",
    fr: "Prix: du plus bas au plus élevé",
    en: "Price: Low to High",
  },
  "sort.price-high": {
    ar: "السعر: من الأعلى للأقل",
    fr: "Prix: du plus élevé au plus bas",
    en: "Price: High to Low",
  },
  "sort.popular": {
    ar: "الأكثر شهرة",
    fr: "Les plus populaires",
    en: "Most Popular",
  },
  "sort.newest": {
    ar: "الأحدث أولاً",
    fr: "Les plus récents",
    en: "Newest First",
  },

  // Account
  "account.orders": {
    ar: "طلباتي",
    fr: "Mes commandes",
    en: "My Orders",
  },
  "account.wishlist": {
    ar: "المفضلة",
    fr: "Favoris",
    en: "Wishlist",
  },
  "account.settings": {
    ar: "الإعدادات",
    fr: "Paramètres",
    en: "Settings",
  },
  "account.logout": {
    ar: "تسجيل الخروج",
    fr: "Déconnexion",
    en: "Logout",
  },
  "account.login": {
    ar: "تسجيل الدخول",
    fr: "Connexion",
    en: "Login",
  },
  "account.register": {
    ar: "إنشاء حساب",
    fr: "S'inscrire",
    en: "Register",
  },

  // Order Status
  "order.status.pending": {
    ar: "قيد الانتظار",
    fr: "En attente",
    en: "Pending",
  },
  "order.status.processing": {
    ar: "قيد المعالجة",
    fr: "En cours de traitement",
    en: "Processing",
  },
  "order.status.shipped": {
    ar: "تم الشحن",
    fr: "Expédié",
    en: "Shipped",
  },
  "order.status.delivered": {
    ar: "تم التوصيل",
    fr: "Livré",
    en: "Delivered",
  },
  "order.status.cancelled": {
    ar: "ملغي",
    fr: "Annulé",
    en: "Cancelled",
  },

  // Notifications
  "notification.success": {
    ar: "تم بنجاح",
    fr: "Succès",
    en: "Success",
  },
  "notification.error": {
    ar: "خطأ",
    fr: "Erreur",
    en: "Error",
  },
  "notification.warning": {
    ar: "تحذير",
    fr: "Avertissement",
    en: "Warning",
  },
  "notification.info": {
    ar: "معلومات",
    fr: "Information",
    en: "Information",
  },

  // Search
  "search.noResults": {
    ar: "لا توجد نتائج",
    fr: "Aucun résultat",
    en: "No results found",
  },
  "search.filters": {
    ar: "التصفية",
    fr: "Filtres",
    en: "Filters",
  },
  "search.sortBy": {
    ar: "ترتيب حسب",
    fr: "Trier par",
    en: "Sort by",
  },

  // Common Actions
  "action.save": {
    ar: "حفظ",
    fr: "Enregistrer",
    en: "Save",
  },
  "action.cancel": {
    ar: "إلغاء",
    fr: "Annuler",
    en: "Cancel",
  },
  "action.delete": {
    ar: "حذف",
    fr: "Supprimer",
    en: "Delete",
  },
  "action.edit": {
    ar: "تعديل",
    fr: "Modifier",
    en: "Edit",
  },
  "action.view": {
    ar: "عرض",
    fr: "Voir",
    en: "View",
  },
  "action.confirm": {
    ar: "تأكيد",
    fr: "Confirmer",
    en: "Confirm",
  },
  "action.back": {
    ar: "رجوع",
    fr: "Retour",
    en: "Back",
  },
};
