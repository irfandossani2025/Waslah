import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale, OrderStatus, ProductStatus, BusinessStatus } from "@/types/domain";

export function StatusPill({
  status,
  locale
}: {
  status: OrderStatus | ProductStatus | BusinessStatus;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const variant =
    status === "cancelled" || status === "suspended"
      ? "destructive"
      : status === "draft" || status === "pending"
        ? "outline"
        : "default";

  return <Badge variant={variant}>{t.statuses[status]}</Badge>;
}
