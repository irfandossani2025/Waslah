import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { businessProfileSchema } from "@/lib/validations/forms";

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    const parsed = businessProfileSchema.parse({
      businessId: formData.get("businessId"),
      nameEn: formData.get("nameEn"),
      nameAr: formData.get("nameAr"),
      descriptionEn: formData.get("descriptionEn"),
      descriptionAr: formData.get("descriptionAr"),
      addressEn: formData.get("addressEn"),
      addressAr: formData.get("addressAr"),
      whatsappNumber: formData.get("whatsappNumber"),
      instagramHandle: formData.get("instagramHandle"),
      currency: formData.get("currency"),
      logoUrl: formData.get("logoUrl"),
      bannerUrl: formData.get("bannerUrl")
    });

    if (isSupabaseConfigured) {
      const supabase = await createServerSupabaseClient();
      await supabase
        .from("businesses")
        .update({
          name: { en: parsed.nameEn, ar: parsed.nameAr },
          description: { en: parsed.descriptionEn, ar: parsed.descriptionAr },
          address: { en: parsed.addressEn, ar: parsed.addressAr },
          whatsapp_number: parsed.whatsappNumber,
          instagram_handle: parsed.instagramHandle,
          currency: parsed.currency,
          logo_url: parsed.logoUrl,
          banner_url: parsed.bannerUrl
        })
        .eq("id", parsed.businessId);
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
    return NextResponse.redirect(new URL("/dashboard/settings?saved=1", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=Please%20review%20your%20business%20details", request.url),
      { status: 303 }
    );
  }
}
