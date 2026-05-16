import { Check } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { BusinessPlan, Locale } from "@/types/domain";

export function PricingCards({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const plans: BusinessPlan[] = ["starter", "business", "premium"];

  return (
    <section className="section-shell py-16" id="pricing">
      <SectionHeading title={t.landing.pricingTitle} align="center" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const item = t.plans[plan];
          const isFeatured = plan === "business";

          return (
            <Card key={plan} className={isFeatured ? "border-primary shadow-glow" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {item.name}
                  {isFeatured ? <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{t.common.popular}</span> : null}
                </CardTitle>
                <div className="text-3xl font-semibold">{item.price}</div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {item.features.map((feature) => (
                    <li className="flex items-center gap-3" key={feature}>
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" type="button">{t.common.startSelling}</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
