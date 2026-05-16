import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/forms";

export async function POST(request: Request) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") || "save");

  try {
    if (intent === "delete") {
      const id = String(formData.get("id") || "");

      if (isSupabaseConfigured && id) {
        const supabase = await createServerSupabaseClient();
        await supabase.from("products").delete().eq("id", id);
      }

      revalidatePath("/dashboard/products");
      return NextResponse.redirect(new URL("/dashboard/products?deleted=1", request.url), { status: 303 });
    }

    const parsed = productSchema.parse({
      id: formData.get("id") || undefined,
      businessId: formData.get("businessId"),
      categoryId: formData.get("categoryId") || undefined,
      nameEn: formData.get("nameEn"),
      nameAr: formData.get("nameAr"),
      descriptionEn: formData.get("descriptionEn"),
      descriptionAr: formData.get("descriptionAr"),
      price: formData.get("price"),
      imageUrl: formData.get("imageUrl"),
      status: formData.get("status"),
      available: formData.get("available") === "on",
      featured: formData.get("featured") === "on"
    });

    if (isSupabaseConfigured) {
      const supabase = await createServerSupabaseClient();
      const payload = {
        business_id: parsed.businessId,
        category_id: parsed.categoryId || null,
        name: { en: parsed.nameEn, ar: parsed.nameAr },
        description: { en: parsed.descriptionEn, ar: parsed.descriptionAr },
        price: parsed.price,
        image_urls: [parsed.imageUrl],
        status: parsed.status,
        available: parsed.available,
        featured: parsed.featured
      };

      if (parsed.id) {
        await supabase.from("products").update(payload).eq("id", parsed.id);
      } else {
        await supabase.from("products").insert(payload);
      }
    }

    revalidatePath("/dashboard/products");
    return NextResponse.redirect(new URL("/dashboard/products?saved=1", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(
      new URL("/dashboard/products?error=Please%20review%20the%20product%20details", request.url),
      { status: 303 }
    );
  }
}
