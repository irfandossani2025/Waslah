"use client";

import Link from "next/link";
import { ArrowRight, MessageCircleMore, Store, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/types/domain";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function HeroSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const highlights = [
    { icon: Store, label: t.landing.highlights[0] },
    { icon: MessageCircleMore, label: t.landing.highlights[1] },
    { icon: TrendingUp, label: t.landing.highlights[2] }
  ];

  return (
    <section className="section-shell py-12 sm:py-16 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mb-4 inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t.landing.eyebrow}
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">{t.landing.title}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{t.landing.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 bg-gradient-to-r from-primary to-cyan-500 px-6 text-white shadow-glow transition hover:brightness-110">
              <Link href="/signup">
                {t.common.startSelling}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="h-12 px-6" variant="outline">
              <Link href="/store/cakehouse">{t.landing.secondaryCta}</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{t.landing.trusted}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative"
        >
          <Card className="gradient-ring animate-float-soft overflow-hidden border-0 bg-hero-grid shadow-glow">
            <CardContent className="p-6 sm:p-8">
              <div className="rounded-[28px] border border-white/60 bg-white/85 p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cake House</p>
                    <h3 className="text-xl font-semibold">WhatsApp-first storefront</h3>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">OMR</div>
                </div>
                <div className="mt-5 space-y-3">
                  {highlights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center justify-between rounded-2xl border border-border/60 bg-white px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="font-medium text-foreground">{item.label}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{index + 1}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
