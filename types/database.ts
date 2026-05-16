export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: "business_owner" | "admin";
          business_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: "business_owner" | "admin";
          business_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          slug: string;
          name: Json;
          description: Json;
          whatsapp_number: string;
          instagram_handle: string;
          address: Json;
          logo_url: string | null;
          banner_url: string | null;
          currency: string;
          status: "active" | "suspended" | "pending";
          plan: "starter" | "business" | "premium";
          created_at: string;
        };
        Insert: {
          owner_id: string;
          slug: string;
          name: Json;
          description?: Json;
          whatsapp_number: string;
          instagram_handle?: string;
          address?: Json;
          logo_url?: string | null;
          banner_url?: string | null;
          currency?: string;
          status?: "active" | "suspended" | "pending";
          plan?: "starter" | "business" | "premium";
        };
        Update: Partial<Database["public"]["Tables"]["businesses"]["Insert"]>;
      };
      categories: {
        Row: {
          id: string;
          business_id: string;
          name: Json;
          sort_order: number;
        };
        Insert: {
          business_id: string;
          name: Json;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          business_id: string;
          category_id: string | null;
          name: Json;
          description: Json;
          price: number;
          image_urls: string[];
          status: "draft" | "active" | "archived";
          available: boolean;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          business_id: string;
          category_id?: string | null;
          name: Json;
          description?: Json;
          price: number;
          image_urls?: string[];
          status?: "draft" | "active" | "archived";
          available?: boolean;
          featured?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      customers: {
        Row: {
          id: string;
          business_id: string;
          full_name: string;
          phone: string;
          notes: string | null;
          total_orders: number;
          total_spent: number;
          created_at: string;
        };
        Insert: {
          business_id: string;
          full_name: string;
          phone: string;
          notes?: string | null;
          total_orders?: number;
          total_spent?: number;
        };
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          business_id: string;
          customer_id: string | null;
          customer_name: string;
          customer_phone: string;
          customer_location: string;
          notes: string | null;
          status: "new" | "confirmed" | "preparing" | "delivered" | "cancelled";
          total_amount: number;
          created_at: string;
        };
        Insert: {
          business_id: string;
          customer_id?: string | null;
          customer_name: string;
          customer_phone: string;
          customer_location?: string;
          notes?: string | null;
          status?: "new" | "confirmed" | "preparing" | "delivered" | "cancelled";
          total_amount: number;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: Json;
          quantity: number;
          unit_price: number;
          line_total: number;
        };
        Insert: {
          order_id: string;
          product_id?: string | null;
          product_name: Json;
          quantity: number;
          unit_price: number;
          line_total: number;
        };
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      subscriptions: {
        Row: {
          id: string;
          business_id: string;
          plan: "starter" | "business" | "premium";
          status: "active" | "trialing" | "past_due" | "cancelled";
          renewal_date: string;
          created_at: string;
        };
        Insert: {
          business_id: string;
          plan: "starter" | "business" | "premium";
          status?: "active" | "trialing" | "past_due" | "cancelled";
          renewal_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
      };
      analytics_events: {
        Row: {
          id: string;
          business_id: string | null;
          event_name: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          business_id?: string | null;
          event_name: string;
          payload?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["analytics_events"]["Insert"]>;
      };
    };
  };
}
