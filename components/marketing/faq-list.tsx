import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/domain";

export function FaqList({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const items = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 }
  ];

  return (
    <section className="section-shell py-16" id="faq">
      <SectionHeading title={t.landing.faqTitle} align="center" />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <Card className="modern-card" key={item.q}>
            <CardContent className="space-y-3 p-6">
              <h3 className="text-lg font-semibold">{item.q}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{item.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
