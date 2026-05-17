import { BarChart3, LayoutTemplate, MessageCircleMore, Package, ShieldCheck, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/domain";

export function FeatureGrid({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const features = [
    { icon: LayoutTemplate, ...t.landing.featureCards[0] },
    { icon: MessageCircleMore, ...t.landing.featureCards[1] },
    { icon: Package, ...t.landing.featureCards[2] },
    { icon: Users, ...t.landing.featureCards[3] },
    { icon: BarChart3, ...t.landing.featureCards[4] },
    { icon: ShieldCheck, ...t.landing.featureCards[5] }
  ];

  return (
    <section className="section-shell py-16" id="features">
      <SectionHeading title={t.landing.featuresTitle} description={t.landing.featuresSubtitle} align="center" />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="modern-card group relative overflow-hidden">
              <CardHeader>
                <div className="mb-4 w-fit rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-400/15 p-3 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="h-1" />
            </Card>
          );
        })}
      </div>
    </section>
  );
}
