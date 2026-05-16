export type Locale = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type BusinessPlan = "starter" | "business" | "premium";
export type BusinessStatus = "active" | "suspended" | "pending";
export type UserRole = "business_owner" | "admin";
export type ProductStatus = "draft" | "active" | "archived";
export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "delivered"
  | "cancelled";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  business_id: string | null;
}

export interface Business {
  id: string;
  owner_id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  whatsapp_number: string;
  instagram_handle: string;
  address: LocalizedText;
  logo_url: string;
  banner_url: string;
  currency: string;
  status: BusinessStatus;
  plan: BusinessPlan;
}

export interface Category {
  id: string;
  business_id: string;
  name: LocalizedText;
  sort_order: number;
}

export interface Product {
  id: string;
  business_id: string;
  category_id: string | null;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image_urls: string[];
  status: ProductStatus;
  available: boolean;
  featured: boolean;
}

export interface Customer {
  id: string;
  business_id: string;
  full_name: string;
  phone: string;
  notes: string | null;
  total_orders: number;
  total_spent: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: LocalizedText;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface Order {
  id: string;
  business_id: string;
  customer_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_location: string;
  notes: string | null;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}

export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  bestSellingProducts: Array<{
    productId: string;
    name: LocalizedText;
    units: number;
  }>;
  revenueSeries: Array<{
    month: string;
    revenue: number;
  }>;
}

export interface StorefrontData {
  business: Business;
  categories: Category[];
  products: Product[];
}

export interface DashboardSnapshot {
  business: Business;
  products: Product[];
  orders: Order[];
  customers: Customer[];
  metrics: DashboardMetrics;
  subscription: {
    plan: BusinessPlan;
    renewalDate: string;
    status: "active" | "trialing" | "past_due";
  };
}

export interface AdminSnapshot {
  businesses: Business[];
  metrics: {
    totalBusinesses: number;
    activeBusinesses: number;
    monthlyGMV: number;
    starterCount: number;
    businessCount: number;
    premiumCount: number;
  };
}
