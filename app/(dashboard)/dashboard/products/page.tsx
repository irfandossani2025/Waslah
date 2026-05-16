import { ProductsBoard } from "@/components/dashboard/products-board";
import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function ProductsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t.dashboard.productsTitle}</h1>
        <p className="mt-2 text-muted-foreground">{t.dashboard.productsSubtitle}</p>
      </div>
      <ProductsBoard currency={snapshot.business.currency} locale={locale} products={snapshot.products} />
    </div>
  );
}
