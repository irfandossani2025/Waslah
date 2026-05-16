import { NextResponse } from "next/server";

import { env, isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations/forms";

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.redirect(new URL("/verify-email", request.url), { status: 303 });
  }

  const formData = await request.formData();

  try {
    const parsed = signUpSchema.parse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      businessName: formData.get("businessName"),
      whatsappNumber: formData.get("whatsappNumber")
    });

    const supabase = await createServerSupabaseClient();
    const slug = slugify(parsed.businessName);

    const { data, error } = await supabase.auth.signUp({
      email: parsed.email,
      password: parsed.password,
      options: {
        emailRedirectTo: `${env.appUrl}/auth/callback`,
        data: {
          full_name: parsed.fullName
        }
      }
    });

    if (error) {
      return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent(error.message)}`, request.url), {
        status: 303
      });
    }

    if (data.user) {
      const businessInsert = await supabase
        .from("businesses")
        .insert({
          owner_id: data.user.id,
          slug,
          name: {
            en: parsed.businessName,
            ar: parsed.businessName
          },
          description: {
            en: "New business on Waslah",
            ar: "نشاط جديد على وصلة"
          },
          whatsapp_number: parsed.whatsappNumber,
          instagram_handle: "@yourstore",
          address: {
            en: "Oman",
            ar: "عمان"
          },
          currency: "OMR",
          plan: "starter",
          status: "pending"
        })
        .select("id")
        .single();

      if (businessInsert.data?.id) {
        await supabase.from("users").upsert({
          id: data.user.id,
          full_name: parsed.fullName,
          email: parsed.email,
          role: "business_owner",
          business_id: businessInsert.data.id
        });
      }
    }

    return NextResponse.redirect(new URL("/verify-email", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(
      new URL("/signup?error=Please%20review%20the%20form%20details", request.url),
      { status: 303 }
    );
  }
}
