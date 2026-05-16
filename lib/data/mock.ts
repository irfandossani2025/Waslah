import type {
  AdminSnapshot,
  Business,
  Category,
  Customer,
  DashboardSnapshot,
  Order,
  Product,
  UserProfile
} from "@/types/domain";

export const mockBusinessOwner: UserProfile = {
  id: "user_demo_owner",
  full_name: "Aisha Al Balushi",
  email: "owner@waslah.app",
  role: "business_owner",
  business_id: "biz_cakehouse"
};

export const mockBusiness: Business = {
  id: "biz_cakehouse",
  owner_id: mockBusinessOwner.id,
  slug: "cakehouse",
  name: {
    en: "Cake House",
    ar: "كيك هاوس"
  },
  description: {
    en: "Fresh cakes, gift boxes, and celebration desserts delivered across Muscat.",
    ar: "كيك طازج وصناديق هدايا وحلويات مناسبات مع التوصيل داخل مسقط."
  },
  whatsapp_number: "96891234567",
  instagram_handle: "@cakehouse.om",
  address: {
    en: "Muscat, Oman",
    ar: "مسقط، عمان"
  },
  logo_url:
    "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=300&q=80",
  banner_url:
    "https://images.unsplash.com/photo-1559622214-5085a9b4d82d?auto=format&fit=crop&w=1200&q=80",
  currency: "OMR",
  status: "active",
  plan: "business"
};

export const mockCategories: Category[] = [
  {
    id: "cat_cakes",
    business_id: mockBusiness.id,
    name: { en: "Celebration Cakes", ar: "كيكات المناسبات" },
    sort_order: 1
  },
  {
    id: "cat_flowers",
    business_id: mockBusiness.id,
    name: { en: "Gift Bundles", ar: "باقات الهدايا" },
    sort_order: 2
  }
];

export const mockProducts: Product[] = [
  {
    id: "prod_choco_cake",
    business_id: mockBusiness.id,
    category_id: "cat_cakes",
    name: { en: "Chocolate Celebration Cake", ar: "كيكة شوكولاتة للمناسبات" },
    description: {
      en: "Rich layered chocolate cake with premium ganache and custom topper.",
      ar: "كيكة شوكولاتة بطبقات غنية مع جاناش فاخر وتزيين حسب الطلب."
    },
    price: 8,
    image_urls: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
    ],
    status: "active",
    available: true,
    featured: true
  },
  {
    id: "prod_red_roses",
    business_id: mockBusiness.id,
    category_id: "cat_flowers",
    name: { en: "Red Roses Bundle", ar: "باقة ورد أحمر" },
    description: {
      en: "Hand-tied red roses paired for birthdays and gifting moments.",
      ar: "باقة ورد أحمر منسقة يدويًا للهدايا والمناسبات."
    },
    price: 5,
    image_urls: [
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=900&q=80"
    ],
    status: "active",
    available: true,
    featured: true
  },
  {
    id: "prod_mini_box",
    business_id: mockBusiness.id,
    category_id: "cat_flowers",
    name: { en: "Mini Gift Box", ar: "صندوق هدية صغير" },
    description: {
      en: "A compact box with cake slice, flowers, and handwritten card.",
      ar: "صندوق صغير يحتوي على قطعة كيك وورد وبطاقة مكتوبة بخط اليد."
    },
    price: 6,
    image_urls: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80"
    ],
    status: "active",
    available: true,
    featured: false
  }
];

export const mockCustomers: Customer[] = [
  {
    id: "cust_1",
    business_id: mockBusiness.id,
    full_name: "Mariam Al Harthy",
    phone: "+968 9911 2233",
    notes: "Prefers evening delivery.",
    total_orders: 4,
    total_spent: 46,
    created_at: "2026-05-01T10:00:00.000Z"
  },
  {
    id: "cust_2",
    business_id: mockBusiness.id,
    full_name: "Saeed Al Lawati",
    phone: "+968 9922 3344",
    notes: null,
    total_orders: 2,
    total_spent: 18,
    created_at: "2026-05-07T15:20:00.000Z"
  }
];

export const mockOrders: Order[] = [
  {
    id: "order_1001",
    business_id: mockBusiness.id,
    customer_id: "cust_1",
    customer_name: "Mariam Al Harthy",
    customer_phone: "+968 9911 2233",
    customer_location: "Al Khuwair",
    notes: "Please include candles.",
    status: "new",
    total_amount: 18,
    created_at: "2026-05-15T10:45:00.000Z",
    items: [
      {
        id: "item_1",
        order_id: "order_1001",
        product_id: "prod_choco_cake",
        product_name: mockProducts[0].name,
        quantity: 1,
        unit_price: 8,
        line_total: 8
      },
      {
        id: "item_2",
        order_id: "order_1001",
        product_id: "prod_red_roses",
        product_name: mockProducts[1].name,
        quantity: 2,
        unit_price: 5,
        line_total: 10
      }
    ]
  },
  {
    id: "order_1002",
    business_id: mockBusiness.id,
    customer_id: "cust_2",
    customer_name: "Saeed Al Lawati",
    customer_phone: "+968 9922 3344",
    customer_location: "Bausher",
    notes: null,
    status: "confirmed",
    total_amount: 14,
    created_at: "2026-05-13T14:10:00.000Z",
    items: [
      {
        id: "item_3",
        order_id: "order_1002",
        product_id: "prod_mini_box",
        product_name: mockProducts[2].name,
        quantity: 1,
        unit_price: 6,
        line_total: 6
      },
      {
        id: "item_4",
        order_id: "order_1002",
        product_id: "prod_red_roses",
        product_name: mockProducts[1].name,
        quantity: 1,
        unit_price: 5,
        line_total: 5
      },
      {
        id: "item_5",
        order_id: "order_1002",
        product_id: null,
        product_name: { en: "Delivery", ar: "التوصيل" },
        quantity: 1,
        unit_price: 3,
        line_total: 3
      }
    ]
  }
];

export const mockDashboardSnapshot: DashboardSnapshot = {
  business: mockBusiness,
  products: mockProducts,
  orders: mockOrders,
  customers: mockCustomers,
  metrics: {
    totalSales: 1260,
    totalOrders: 82,
    bestSellingProducts: [
      { productId: mockProducts[0].id, name: mockProducts[0].name, units: 32 },
      { productId: mockProducts[1].id, name: mockProducts[1].name, units: 28 },
      { productId: mockProducts[2].id, name: mockProducts[2].name, units: 18 }
    ],
    revenueSeries: [
      { month: "Jan", revenue: 640 },
      { month: "Feb", revenue: 910 },
      { month: "Mar", revenue: 1120 },
      { month: "Apr", revenue: 980 },
      { month: "May", revenue: 1260 }
    ]
  },
  subscription: {
    plan: "business",
    renewalDate: "2026-06-12T00:00:00.000Z",
    status: "active"
  }
};

export const mockAdminSnapshot: AdminSnapshot = {
  businesses: [
    mockBusiness,
    {
      ...mockBusiness,
      id: "biz_perfume",
      slug: "amber-bloom",
      name: { en: "Amber Bloom", ar: "أمبر بلوم" },
      status: "active",
      plan: "premium"
    },
    {
      ...mockBusiness,
      id: "biz_cafe",
      slug: "daily-brew",
      name: { en: "Daily Brew", ar: "ديلي برو" },
      status: "suspended",
      plan: "starter"
    }
  ],
  metrics: {
    totalBusinesses: 3,
    activeBusinesses: 2,
    monthlyGMV: 8450,
    starterCount: 1,
    businessCount: 1,
    premiumCount: 1
  }
};
