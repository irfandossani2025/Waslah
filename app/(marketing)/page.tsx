import { MessageCircleMore, Quote } from "lucide-react";
import Link from "next/link";

import { DemoPreview } from "@/components/marketing/demo-preview";
import { FaqList } from "@/components/marketing/faq-list";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero-section";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function MarketingPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <main>
      <SiteHeader locale={locale} />
      <HeroSection locale={locale} />
      <FeatureGrid locale={locale} />
      <DemoPreview locale={locale} />

      <section className="section-shell py-16">
        <SectionHeading title={t.landing.testimonialsTitle} align="center" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card className="modern-card" key={item}>
              <CardContent className="space-y-4 p-6">
                <Quote className="h-6 w-6 text-primary" />
                <p className="text-sm leading-7 text-muted-foreground">
                  {locale === "en"
                    ? "Waslah made WhatsApp orders feel organized for the first time."
                    : "وصلة جعلت طلبات واتساب تبدو منظمة لأول مرة."}
                </p>
                <div className="text-sm font-semibold">
                  {locale === "en" ? "Testimonial placeholder" : "مكان مخصص للشهادة"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <PricingCards locale={locale} />
      <FaqList locale={locale} />

      <section className="section-shell py-16">
        <Card className="gradient-ring overflow-hidden border-0 bg-gradient-to-r from-primary via-cyan-500 to-indigo-500 text-primary-foreground shadow-glow">
          <CardContent className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{t.landing.ctaTitle}</h2>
              <p className="mt-3 text-base leading-7 text-primary-foreground/80">{t.landing.ctaSubtitle}</p>
            </div>
            <Button asChild className="bg-white text-primary hover:bg-white/95">
              <Link href="/signup">
                <MessageCircleMore className="h-4 w-4" />
                {t.common.startSelling}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
