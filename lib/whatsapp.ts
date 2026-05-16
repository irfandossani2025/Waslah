import type { Locale, OrderItem } from "@/types/domain";

export function normalizeWhatsAppNumber(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function buildWhatsAppMessage({
  locale,
  items,
  total,
  currency,
  customerName,
  customerLocation,
  notes
}: {
  locale: Locale;
  items: Array<{
    name: string;
    quantity: number;
    lineTotal: number;
  }>;
  total: number;
  currency: string;
  customerName?: string;
  customerLocation?: string;
  notes?: string;
}) {
  const lines =
    locale === "ar"
      ? [
          "مرحبًا، أريد طلب:",
          "",
          ...items.map((item) => `${item.quantity}x ${item.name} - ${item.lineTotal} ${currency}`),
          "",
          `الإجمالي: ${total} ${currency}`,
          "",
          `الاسم: ${customerName || ""}`,
          `الموقع: ${customerLocation || ""}`,
          `ملاحظات: ${notes || ""}`
        ]
      : [
          "Hello, I want to order:",
          "",
          ...items.map((item) => `${item.quantity}x ${item.name} - ${item.lineTotal} ${currency}`),
          "",
          `Total: ${total} ${currency}`,
          "",
          `My name: ${customerName || ""}`,
          `My location: ${customerLocation || ""}`,
          `Notes: ${notes || ""}`
        ];

  return lines.join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string) {
  const normalized = normalizeWhatsAppNumber(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function mapOrderItemsForMessage(items: OrderItem[], locale: Locale) {
  return items.map((item) => ({
    name: item.product_name[locale] || item.product_name.en,
    quantity: item.quantity,
    lineTotal: item.line_total
  }));
}
