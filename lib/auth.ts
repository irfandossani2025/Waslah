import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mockAdminSnapshot, mockBusinessOwner, mockDashboardSnapshot } from "@/lib/data/mock";
import type { UserProfile } from "@/types/domain";

export async function getCurrentUserContext() {
  if (!isSupabaseConfigured) {
    return {
      authUser: { id: mockBusinessOwner.id, email: mockBusinessOwner.email },
      profile: mockBusinessOwner,
      dashboard: mockDashboardSnapshot,
      admin: mockAdminSnapshot
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      authUser: null,
      profile: null,
      dashboard: null,
      admin: null
    };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    authUser: user,
    profile: profile as UserProfile | null,
    dashboard: null,
    admin: null
  };
}

export async function requireDashboardUser() {
  const context = await getCurrentUserContext();

  if (!context.authUser || !context.profile) {
    redirect("/login");
  }

  return context;
}
