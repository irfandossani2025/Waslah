import { NextResponse } from "next/server";

import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/validations/forms";

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.redirect(new URL("/dashboard", request.url), { status: 303 });
  }

  const formData = await request.formData();

  try {
    const parsed = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.email,
      password: parsed.password
    });

    if (error) {
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url), {
        status: 303
      });
    }

    return NextResponse.redirect(new URL("/dashboard", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=Please%20check%20your%20email%20and%20password", request.url),
      { status: 303 }
    );
  }
}
