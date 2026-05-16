import { cache } from "react";

import { getCurrentUserContext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import {
  mockAdminSnapshot,
  mockBusiness,
  mockCategories,
  mockCustomers,
  mockDashboardSnapshot,
  mockOrders,
  mockProducts
} from "@/lib/data/mock";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  AdminSnapshot,
  Business,
  Category,
  Customer,
  DashboardSnapshot,
  Order,
  Product,
  StorefrontData
} from "@/types/domain";

function mapBusiness(row: {
  id: string;
  owner_id: string;
  slug: string;
  name: Business["name"];
  description: Business["description"];
  whatsapp_number: string;
  instagram_handle: string;
  address: Business["address"];
  logo_url: string | null;
  banner_url: string | null;
  currency: string;
  status: Business["status"];
  plan: Business["plan"];
}): Business {
  return {
    ...row,
    logo_url: row.logo_url || "",
    banner_url: row.banner_url || ""
  };
}

export const getStorefrontData = cache(async (slug: string): Promise<StorefrontData> => {
  if (!isSupabaseConfigured) {
    return {
      business: mockBusiness,
      categories: mockCategories,
      products: mockProducts
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (!business) {
    return {
      business: mockBusiness,
      categories: mockCategories,
      products: mockProducts
    };
  }

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").eq("business_id", business.id).order("sort_order"),
    supabase
      .from("products")
      .select("*")
      .eq("business_id", business.id)
      .neq("status", "archived")
      .order("featured", { ascending: false })
  ]);

  return {
    business: mapBusiness(business),
    categories: (categories || []) as Category[],
    products: (products || []) as Product[]
  };
});

export const getDashboardSnapshot = cache(async (): Promise<DashboardSnapshot> => {
  if (!isSupabaseConfigured) {
    return mockDashboardSnapshot;
  }

  const context = await getCurrentUserContext();

  if (!context.profile?.business_id) {
    return mockDashboardSnapshot;
  }

  const supabase = await createServerSupabaseClient();
  const businessId = context.profile.business_id;

  const [{ data: business }, { data: products }, { data: customers }, { data: orders }, { data: subscriptions }] =
    await Promise.all([
      supabase.from("businesses").select("*").eq("id", businessId).single(),
      supabase.from("products").select("*").eq("business_id", businessId),
      supabase.from("customers").select("*").eq("business_id", businessId),
      supabase.from("orders").select("*").eq("business_id", businessId).order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*").eq("business_id", businessId).limit(1).single()
    ]);

  const orderIds = (orders || []).map((order) => order.id);
  const { data: orderItems } = orderIds.length
    ? await supabase.from("order_items").select("*").in("order_id", orderIds)
    : { data: [] };

  const fullOrders: Order[] = (orders || []).map((order) => ({
    ...(order as Order),
    items: (orderItems || []).filter((item) => item.order_id === order.id) as Order["items"]
  }));

  const totalSales = fullOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const revenueMap = new Map<string, number>();
  fullOrders.forEach((order) => {
    const month = new Date(order.created_at).toLocaleDateString("en", { month: "short" });
    revenueMap.set(month, (revenueMap.get(month) || 0) + Number(order.total_amount));
  });

  const bestSellerCounts = new Map<string, { name: Product["name"]; units: number }>();
  fullOrders.forEach((order) => {
    order.items.forEach((item) => {
      const existing = bestSellerCounts.get(item.product_id || item.id);
      if (!existing) {
        bestSellerCounts.set(item.product_id || item.id, {
          name: item.product_name,
          units: item.quantity
        });
        return;
      }
      existing.units += item.quantity;
    });
  });

  if (!business) {
    return mockDashboardSnapshot;
  }

  return {
    business: mapBusiness(business as Parameters<typeof mapBusiness>[0]),
    products: (products || []) as Product[],
    customers: (customers || []) as Customer[],
    orders: fullOrders,
    metrics: {
      totalSales,
      totalOrders: fullOrders.length,
      bestSellingProducts: [...bestSellerCounts.entries()]
        .map(([productId, value]) => ({ productId, ...value }))
        .sort((a, b) => b.units - a.units)
        .slice(0, 4),
      revenueSeries: [...revenueMap.entries()].map(([month, revenue]) => ({ month, revenue }))
    },
    subscription: {
      plan: subscriptions?.plan || "starter",
      renewalDate: subscriptions?.renewal_date || new Date().toISOString(),
      status: subscriptions?.status || "trialing"
    }
  };
});

export const getAdminSnapshot = cache(async (): Promise<AdminSnapshot> => {
  if (!isSupabaseConfigured) {
    return mockAdminSnapshot;
  }

  const supabase = await createServerSupabaseClient();
  const { data: businesses } = await supabase.from("businesses").select("*").order("created_at");
  const { data: orders } = await supabase.from("orders").select("business_id,total_amount");

  const metrics = {
    totalBusinesses: businesses?.length || 0,
    activeBusinesses: businesses?.filter((item) => item.status === "active").length || 0,
    monthlyGMV: (orders || []).reduce((sum, item) => sum + Number(item.total_amount), 0),
    starterCount: businesses?.filter((item) => item.plan === "starter").length || 0,
    businessCount: businesses?.filter((item) => item.plan === "business").length || 0,
    premiumCount: businesses?.filter((item) => item.plan === "premium").length || 0
  };

  return {
    businesses: (businesses || []).map((item) => mapBusiness(item as Parameters<typeof mapBusiness>[0])),
    metrics
  };
});

export async function getBusinessSeedBundle() {
  return {
    business: mockBusiness,
    categories: mockCategories,
    products: mockProducts,
    orders: mockOrders,
    customers: mockCustomers
  };
}
