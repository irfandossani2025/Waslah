import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { whatsappCheckoutSchema } from "@/lib/validations/forms";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = whatsappCheckoutSchema.parse(body);

  const message = buildWhatsAppMessage(parsed);
  const url = buildWhatsAppUrl(parsed.whatsappNumber, message);

  return NextResponse.json({ url, message });
}
