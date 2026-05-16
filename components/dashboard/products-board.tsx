import Image from "next/image";
import Link from "next/link";

import { StatusPill } from "@/components/shared/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveLocalizedText } from "@/lib/i18n/config";
import type { Locale, Product } from "@/types/domain";

export function ProductsBoard({
  locale,
  currency,
  products
}: {
  locale: Locale;
  currency: string;
  products: Product[];
}) {
  const t = getDictionary(locale);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>{t.dashboard.productsTitle}</CardTitle>
          <CardDescription>{t.dashboard.productsSubtitle}</CardDescription>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">{t.dashboard.addProduct}</Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div className="rounded-3xl border border-border/70 bg-white p-4" key={product.id}>
            <div className="relative h-44 overflow-hidden rounded-2xl">
              <Image alt={product.name.en} className="object-cover" fill src={product.image_urls[0]} />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{resolveLocalizedText(product.name, locale)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(product.price, currency, locale)}</p>
              </div>
              {product.featured ? <Badge>{t.common.featured}</Badge> : null}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <StatusPill locale={locale} status={product.status} />
              <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/products/${product.id}`}>{t.common.edit}</Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
