import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { mockProducts } from "@/lib/data/mock";
import type { Locale } from "@/types/domain";

export function DemoPreview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="section-shell py-16">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading title={t.landing.demoTitle} description={t.landing.demoSubtitle} />
        <Card className="modern-card overflow-hidden">
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockProducts.slice(0, 2).map((product) => (
                <div className="rounded-3xl border border-white/70 bg-white/90 p-3 transition duration-300 hover:-translate-y-1 hover:shadow-soft" key={product.id}>
                  <div className="relative h-44 overflow-hidden rounded-2xl">
                    <Image alt={product.name.en} className="object-cover" fill src={product.image_urls[0]} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{product.name[locale]}</div>
                      <div className="text-sm text-muted-foreground">{product.price} OMR</div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-cyan-500 text-white hover:brightness-110">{t.storefront.addToCart}</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button asChild>
                <Link href="/store/cakehouse">{t.common.storefront}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
