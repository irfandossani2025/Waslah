import { notFound } from "next/navigation";

import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getStorefrontData } from "@/lib/data/queries";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function StorefrontPage({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const locale = await getLocale();
  const data = await getStorefrontData(slug);

  if (!data.business) {
    notFound();
  }

  return <StorefrontShell data={data} locale={locale} />;
}
