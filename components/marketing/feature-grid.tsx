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
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="border-white/60">
              <CardHeader>
                <div className="mb-4 w-fit rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          );
        })}
      </div>
    </section>
  );
}
