import type { Locale } from "@/types/domain";

const dictionaries = {
  en: {
    common: {
      appName: "Waslah",
      startSelling: "Start Selling on WhatsApp",
      dashboard: "Dashboard",
      storefront: "Storefront",
      products: "Products",
      orders: "Orders",
      customers: "Customers",
      analytics: "Analytics",
      settings: "Settings",
      admin: "Admin",
      save: "Save changes",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      featured: "Featured",
      available: "Available",
      unavailable: "Unavailable",
      search: "Search",
      all: "All",
      status: "Status",
      plan: "Plan",
      loading: "Loading",
      empty: "Nothing here yet",
      signOut: "Sign out",
      sold: "sold"
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      signIn: "Sign in",
      getStarted: "Get started"
    },
    landing: {
      eyebrow: "WhatsApp-first order management for Oman and GCC sellers",
      title: "Turn Instagram and WhatsApp chats into organized orders.",
      subtitle:
        "Waslah gives small businesses a simple storefront, fast WhatsApp checkout, and a clean dashboard without the complexity of a full marketplace.",
      secondaryCta: "View demo storefront",
      trusted: "Built for home businesses, cafes, gift shops, perfumes, fashion, and bakeries.",
      featuresTitle: "Everything you need to sell without the chaos",
      featuresSubtitle:
        "The MVP focuses on the actions that matter most: show products clearly, collect orders quickly, and stay on top of customers.",
      demoTitle: "A storefront that feels premium on mobile",
      demoSubtitle:
        "Customers browse, add items to cart, and jump into WhatsApp with a prefilled order in seconds.",
      testimonialsTitle: "Loved by growing sellers",
      pricingTitle: "Simple pricing that grows with your business",
      faqTitle: "Questions small businesses ask first",
      ctaTitle: "Launch your WhatsApp storefront this week",
      ctaSubtitle:
        "Set up your catalog, share your store link, and start receiving cleaner orders today.",
      highlights: ["Mini storefront", "WhatsApp checkout", "Simple analytics"],
      featureCards: [
        {
          title: "Mini storefront",
          description: "A clean mobile storefront that loads fast and matches your brand."
        },
        {
          title: "WhatsApp checkout",
          description: "Turn carts into prefilled WhatsApp messages with almost no friction."
        },
        {
          title: "Catalog control",
          description: "Manage categories, pricing, featured products, and availability from one dashboard."
        },
        {
          title: "Simple CRM",
          description: "See customer names, numbers, order history, and repeat buyer value."
        },
        {
          title: "Useful analytics",
          description: "Track sales, order count, recent activity, and best-selling products."
        },
        {
          title: "Secure by default",
          description: "Supabase auth, RLS, protected routes, and validation-ready server actions."
        }
      ]
    },
    auth: {
      welcomeBack: "Welcome back",
      createAccount: "Create your business account",
      forgotPassword: "Forgot password",
      verifyEmail: "Verify your email",
      loginHint: "Sign in to manage products, orders, and customer chats.",
      signupHint: "Start with your business details and we will create your storefront.",
      forgotHint: "We will email you a secure reset link.",
      verifyHint: "Please check your inbox and confirm your email before continuing.",
      fullName: "Full name",
      email: "Email",
      password: "Password",
      businessName: "Business name",
      whatsappNumber: "WhatsApp number",
      submitLogin: "Sign in",
      submitSignup: "Create account",
      submitReset: "Send reset email",
      haveAccount: "Already have an account?",
      noAccount: "Need a new account?"
    },
    dashboard: {
      overviewTitle: "Business overview",
      overviewSubtitle: "Track sales, orders, products, and customer activity in one place.",
      totalSales: "Total sales",
      totalOrders: "Total orders",
      bestSellers: "Best sellers",
      recentOrders: "Recent orders",
      monthlyRevenue: "Monthly revenue",
      orderManagerTitle: "Order management",
      orderManagerSubtitle: "Search, filter, and update customer orders quickly.",
      customersTitle: "Customer management",
      customersSubtitle: "Keep names, phones, and order history ready for repeat sales.",
      productsTitle: "Product catalog",
      productsSubtitle: "Add items, control availability, and highlight featured products.",
      settingsTitle: "Business settings",
      settingsSubtitle: "Update brand assets, WhatsApp details, and storefront information.",
      adminTitle: "Platform admin",
      adminSubtitle: "Monitor stores, plans, and platform-wide performance.",
      addProduct: "Add product",
      managePlan: "Manage subscription",
      publicStore: "Public store",
      demoMode: "Demo mode"
    },
    storefront: {
      orderViaWhatsApp: "Order via WhatsApp",
      addToCart: "Add to cart",
      cart: "Cart",
      yourCart: "Your cart",
      continueShopping: "Continue shopping",
      emptyCart: "Your cart is empty",
      customerName: "Your name",
      customerLocation: "Your location",
      notes: "Notes",
      orderSummary: "Order summary",
      total: "Total",
      heroTag: "WhatsApp ordering made simple",
      featuredProducts: "Featured products",
      allProducts: "All products"
    },
    plans: {
      starter: {
        name: "Starter",
        price: "9 OMR",
        description: "For solo sellers getting started with WhatsApp orders.",
        features: ["1 storefront", "Up to 25 products", "WhatsApp checkout", "Basic analytics"]
      },
      business: {
        name: "Business",
        price: "19 OMR",
        description: "For active stores that need better order visibility and analytics.",
        features: ["Up to 200 products", "Customer CRM", "Order pipeline", "Monthly insights"]
      },
      premium: {
        name: "Premium",
        price: "39 OMR",
        description: "For scaling brands preparing for operations, staff, and integrations.",
        features: ["Priority support", "Staff roles ready", "Advanced insights", "Future integrations ready"]
      }
    },
    faq: {
      q1: "Does Waslah process payments?",
      a1: "The MVP keeps checkout simple with WhatsApp ordering. Payment gateways can be added later.",
      q2: "Can I use Arabic content?",
      a2: "Yes. The app is structured for English and Arabic with RTL support ready.",
      q3: "Do my customers need an account?",
      a3: "No. Customers can browse your storefront and place orders directly through WhatsApp."
    },
    statuses: {
      new: "New",
      confirmed: "Confirmed",
      preparing: "Preparing",
      delivered: "Delivered",
      cancelled: "Cancelled",
      active: "Active",
      suspended: "Suspended",
      pending: "Pending",
      draft: "Draft",
      archived: "Archived"
    },
    admin: {
      suspendStore: "Suspend store",
      platformMetrics: "Platform metrics",
      activeStores: "Active stores",
      monthlyGMV: "Monthly GMV",
      subscriptions: "Subscriptions"
    },
    placeholders: {
      orderItems: "items"
    }
  },
  ar: {
    common: {
      appName: "وصلة",
      startSelling: "ابدأ البيع عبر واتساب",
      dashboard: "لوحة التحكم",
      storefront: "المتجر",
      products: "المنتجات",
      orders: "الطلبات",
      customers: "العملاء",
      analytics: "التحليلات",
      settings: "الإعدادات",
      admin: "الإدارة",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      featured: "مميز",
      available: "متاح",
      unavailable: "غير متاح",
      search: "بحث",
      all: "الكل",
      status: "الحالة",
      plan: "الباقة",
      loading: "جاري التحميل",
      empty: "لا يوجد شيء هنا بعد",
      signOut: "تسجيل الخروج",
      sold: "مباع"
    },
    nav: {
      features: "المزايا",
      pricing: "الأسعار",
      faq: "الأسئلة الشائعة",
      signIn: "تسجيل الدخول",
      getStarted: "ابدأ الآن"
    },
    landing: {
      eyebrow: "إدارة الطلبات عبر واتساب لبائعي عمان والخليج",
      title: "حوّل رسائل إنستجرام وواتساب إلى طلبات منظمة.",
      subtitle:
        "وصلة تمنح المشاريع الصغيرة متجرًا بسيطًا وطلبًا سريعًا عبر واتساب ولوحة تحكم نظيفة بدون تعقيد المنصات الكبيرة.",
      secondaryCta: "عرض متجر تجريبي",
      trusted: "مصمم للمشاريع المنزلية والمقاهي ومحلات الهدايا والعطور والأزياء والمخابز.",
      featuresTitle: "كل ما تحتاجه للبيع بدون فوضى",
      featuresSubtitle:
        "يركز الإصدار الأول على أهم ما يحتاجه التاجر: عرض المنتجات بوضوح، جمع الطلبات بسرعة، ومتابعة العملاء بسهولة.",
      demoTitle: "متجر أنيق ومثالي للجوال",
      demoSubtitle:
        "العميل يتصفح ويضيف للسلة ثم ينتقل إلى واتساب برسالة طلب جاهزة خلال ثوانٍ.",
      testimonialsTitle: "محبوب من البائعين المتنامين",
      pricingTitle: "أسعار بسيطة تنمو مع مشروعك",
      faqTitle: "الأسئلة الأولى التي يطرحها أصحاب المشاريع",
      ctaTitle: "أطلق متجرك على واتساب هذا الأسبوع",
      ctaSubtitle:
        "أضف منتجاتك وشارك رابط متجرك وابدأ في استقبال طلبات أوضح اليوم.",
      highlights: ["متجر مصغر", "طلب عبر واتساب", "تحليلات بسيطة"],
      featureCards: [
        {
          title: "متجر مصغر",
          description: "واجهة متجر نظيفة وسريعة على الجوال وتناسب هوية نشاطك."
        },
        {
          title: "الطلب عبر واتساب",
          description: "تحويل السلة إلى رسالة واتساب جاهزة بأقل احتكاك ممكن."
        },
        {
          title: "إدارة الكتالوج",
          description: "تحكم في التصنيفات والأسعار والمنتجات المميزة والتوفر من لوحة واحدة."
        },
        {
          title: "CRM بسيط",
          description: "اعرف أسماء العملاء وأرقامهم وسجل طلباتهم وقيمة الشراء المتكرر."
        },
        {
          title: "تحليلات مفيدة",
          description: "تابع المبيعات وعدد الطلبات وآخر النشاطات والمنتجات الأكثر مبيعًا."
        },
        {
          title: "أمان افتراضي",
          description: "مصادقة Supabase وRLS ومسارات محمية وإجراءات خادم قابلة للتحقق."
        }
      ]
    },
    auth: {
      welcomeBack: "مرحبًا بعودتك",
      createAccount: "أنشئ حساب نشاطك التجاري",
      forgotPassword: "نسيت كلمة المرور",
      verifyEmail: "تأكيد البريد الإلكتروني",
      loginHint: "سجّل الدخول لإدارة المنتجات والطلبات والعملاء.",
      signupHint: "ابدأ ببيانات نشاطك وسننشئ لك متجرك مباشرة.",
      forgotHint: "سنرسل لك رابطًا آمنًا لإعادة تعيين كلمة المرور.",
      verifyHint: "يرجى فتح بريدك الإلكتروني وتأكيد الحساب قبل المتابعة.",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      businessName: "اسم النشاط",
      whatsappNumber: "رقم واتساب",
      submitLogin: "تسجيل الدخول",
      submitSignup: "إنشاء الحساب",
      submitReset: "إرسال رابط الاستعادة",
      haveAccount: "لديك حساب بالفعل؟",
      noAccount: "تحتاج إلى حساب جديد؟"
    },
    dashboard: {
      overviewTitle: "نظرة عامة على النشاط",
      overviewSubtitle: "تابع المبيعات والطلبات والمنتجات والعملاء من مكان واحد.",
      totalSales: "إجمالي المبيعات",
      totalOrders: "إجمالي الطلبات",
      bestSellers: "الأكثر مبيعًا",
      recentOrders: "أحدث الطلبات",
      monthlyRevenue: "الإيراد الشهري",
      orderManagerTitle: "إدارة الطلبات",
      orderManagerSubtitle: "ابحث وصفِّ وحدّث الطلبات بسرعة.",
      customersTitle: "إدارة العملاء",
      customersSubtitle: "احتفظ بالأسماء والأرقام وسجل الطلبات لزيادة المبيعات المتكررة.",
      productsTitle: "كتالوج المنتجات",
      productsSubtitle: "أضف المنتجات وتحكم في التوفر وابرز المنتجات المميزة.",
      settingsTitle: "إعدادات النشاط",
      settingsSubtitle: "حدّث الهوية البصرية وواتساب ومعلومات المتجر.",
      adminTitle: "إدارة المنصة",
      adminSubtitle: "راقب المتاجر والباقات وأداء المنصة بالكامل.",
      addProduct: "إضافة منتج",
      managePlan: "إدارة الاشتراك",
      publicStore: "المتجر العام",
      demoMode: "الوضع التجريبي"
    },
    storefront: {
      orderViaWhatsApp: "اطلب عبر واتساب",
      addToCart: "أضف إلى السلة",
      cart: "السلة",
      yourCart: "سلتك",
      continueShopping: "متابعة التسوق",
      emptyCart: "السلة فارغة",
      customerName: "اسمك",
      customerLocation: "موقعك",
      notes: "ملاحظات",
      orderSummary: "ملخص الطلب",
      total: "الإجمالي",
      heroTag: "الطلب عبر واتساب أصبح أسهل",
      featuredProducts: "منتجات مميزة",
      allProducts: "كل المنتجات"
    },
    plans: {
      starter: {
        name: "ستارتر",
        price: "9 ر.ع",
        description: "للبائعين الأفراد الذين يبدأون طلباتهم عبر واتساب.",
        features: ["متجر واحد", "حتى 25 منتجًا", "طلب عبر واتساب", "تحليلات أساسية"]
      },
      business: {
        name: "بزنس",
        price: "19 ر.ع",
        description: "للمتاجر النشطة التي تحتاج رؤية أوضح للطلبات والتحليلات.",
        features: ["حتى 200 منتج", "إدارة العملاء", "مسار الطلبات", "تقارير شهرية"]
      },
      premium: {
        name: "بريميوم",
        price: "39 ر.ع",
        description: "للعلامات المتنامية التي تستعد للتشغيل والطاقم والتكاملات.",
        features: ["دعم أولوية", "جاهزية أدوار الفريق", "تحليلات متقدمة", "جاهزية للتكاملات المستقبلية"]
      }
    },
    faq: {
      q1: "هل تعالج وصلة المدفوعات؟",
      a1: "يركز الإصدار الأول على بساطة الطلب عبر واتساب، ويمكن إضافة بوابات الدفع لاحقًا.",
      q2: "هل أستطيع استخدام العربية؟",
      a2: "نعم، التطبيق مهيأ للإنجليزية والعربية مع دعم RTL جاهز.",
      q3: "هل يحتاج العميل إلى حساب؟",
      a3: "لا، يستطيع العميل التصفح والطلب مباشرة عبر واتساب دون تسجيل."
    },
    statuses: {
      new: "جديد",
      confirmed: "مؤكد",
      preparing: "قيد التجهيز",
      delivered: "تم التوصيل",
      cancelled: "ملغي",
      active: "نشط",
      suspended: "معلق",
      pending: "قيد المراجعة",
      draft: "مسودة",
      archived: "مؤرشف"
    },
    admin: {
      suspendStore: "تعليق المتجر",
      platformMetrics: "مؤشرات المنصة",
      activeStores: "المتاجر النشطة",
      monthlyGMV: "إجمالي المبيعات الشهري",
      subscriptions: "الاشتراكات"
    },
    placeholders: {
      orderItems: "عناصر"
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
      order: "Order",
      customer: "Customer",
      date: "Date",
      popular: "Popular",
      order: "الطلب",
      customer: "العميل",
      date: "التاريخ",
      popular: "الأكثر اختيارًا",
