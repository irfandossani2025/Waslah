import { NextResponse } from "next/server";

import { env, isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { forgotPasswordSchema } from "@/lib/validations/forms";

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.redirect(new URL("/forgot-password?sent=1", request.url), { status: 303 });
  }

  const formData = await request.formData();

  try {
    const parsed = forgotPasswordSchema.parse({
      email: formData.get("email")
    });

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.email, {
      redirectTo: `${env.appUrl}/login`
    });

    if (error) {
      return NextResponse.redirect(
        new URL(`/forgot-password?error=${encodeURIComponent(error.message)}`, request.url),
        { status: 303 }
      );
    }

    return NextResponse.redirect(new URL("/forgot-password?sent=1", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(
      new URL("/forgot-password?error=Please%20enter%20a%20valid%20email", request.url),
      { status: 303 }
    );
  }
}
