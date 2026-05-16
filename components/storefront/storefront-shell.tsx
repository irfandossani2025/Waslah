"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MessageCircleMore, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { resolveLocalizedText } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn, formatCurrency } from "@/lib/utils";
import type { Locale, Product, StorefrontData } from "@/types/domain";

type CartItem = {
  product: Product;
  quantity: number;
};

export function StorefrontShell({ locale, data }: { locale: Locale; data: StorefrontData }) {
  const t = getDictionary(locale);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [notes, setNotes] = useState("");

  const featuredProducts = data.products.filter((product) => product.featured);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  function updateQuantity(product: Product, delta: number) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing && delta > 0) {
        toast.success(resolveLocalizedText(product.name, locale));
        return [...current, { product, quantity: 1 }];
      }

      return current
        .map((item) =>
          item.product.id === product.id ? { ...item, quantity: Math.max(item.quantity + delta, 0) } : item
        )
        .filter((item) => item.quantity > 0);
    });
  }

  function checkout() {
    if (!cart.length) {
      toast.error(t.storefront.emptyCart);
      return;
    }

    const message = buildWhatsAppMessage({
      locale,
      items: cart.map((item) => ({
        name: resolveLocalizedText(item.product.name, locale),
        quantity: item.quantity,
        lineTotal: item.quantity * item.product.price
      })),
      total,
      currency: data.business.currency,
      customerName,
      customerLocation,
      notes
    });

    window.location.href = buildWhatsAppUrl(data.business.whatsapp_number, message);
  }

  const productSections = [
    {
      title: t.storefront.featuredProducts,
      products: featuredProducts
    },
    {
      title: t.storefront.allProducts,
      products: data.products
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-56 overflow-hidden sm:h-72">
        <Image alt={data.business.name.en} className="object-cover" fill src={data.business.banner_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="section-shell absolute inset-x-0 bottom-0 pb-6 text-white">
          <div className="max-w-xl">
            <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/80">{t.storefront.heroTag}</div>
            <h1 className="text-3xl font-semibold">{resolveLocalizedText(data.business.name, locale)}</h1>
            <p className="mt-2 text-sm text-white/85">{resolveLocalizedText(data.business.description, locale)}</p>
          </div>
        </div>
      </div>

      <div className="section-shell py-6 sm:py-8">
        {productSections.map((section) => (
          <section className="mb-8" key={section.title}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <div className="text-sm text-muted-foreground">{data.business.currency}</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.products.map((product) => {
                const cartQuantity = cart.find((item) => item.product.id === product.id)?.quantity || 0;
                return (
                  <div className="surface overflow-hidden" key={`${section.title}-${product.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image alt={product.name.en} className="object-cover" fill src={product.image_urls[0]} />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{resolveLocalizedText(product.name, locale)}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {resolveLocalizedText(product.description, locale)}
                          </p>
                        </div>
                        {product.featured ? (
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {t.common.featured}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-base font-semibold">
                          {formatCurrency(product.price, data.business.currency, locale)}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className={cn(
                              "rounded-full border border-border p-2 text-muted-foreground transition hover:bg-secondary",
                              cartQuantity === 0 && "opacity-50"
                            )}
                            onClick={() => updateQuantity(product, -1)}
                            type="button"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">{cartQuantity}</span>
                          <button
                            className="rounded-full bg-primary p-2 text-white transition hover:opacity-95"
                            onClick={() => updateQuantity(product, 1)}
                            type="button"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <Sheet>
        <div className="fixed inset-x-0 bottom-4 z-30 mx-auto max-w-sm px-4">
          <SheetTrigger asChild>
            <Button className="h-14 w-full rounded-2xl text-base shadow-glow">
              <ShoppingBag className="h-5 w-5" />
              {t.storefront.cart} ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent className="max-w-lg">
          <SheetHeader>
            <SheetTitle>{t.storefront.yourCart}</SheetTitle>
            <SheetDescription>{t.storefront.orderSummary}</SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            {cart.length ? (
              cart.map((item) => (
                <div className="rounded-2xl border border-border/70 p-4" key={item.product.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{resolveLocalizedText(item.product.name, locale)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(item.product.price, data.business.currency, locale)}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">x{item.quantity}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                {t.storefront.emptyCart}
              </div>
            )}

            <div className="grid gap-3">
              <Input onChange={(event) => setCustomerName(event.target.value)} placeholder={t.storefront.customerName} value={customerName} />
              <Input onChange={(event) => setCustomerLocation(event.target.value)} placeholder={t.storefront.customerLocation} value={customerLocation} />
              <Textarea onChange={(event) => setNotes(event.target.value)} placeholder={t.storefront.notes} value={notes} />
            </div>

            <div className="rounded-2xl bg-secondary p-4">
              <div className="flex items-center justify-between font-semibold">
                <span>{t.storefront.total}</span>
                <span>{formatCurrency(total, data.business.currency, locale)}</span>
              </div>
            </div>

            <Button className="h-12 w-full rounded-2xl" onClick={checkout} type="button">
              <MessageCircleMore className="h-5 w-5" />
              {t.storefront.orderViaWhatsApp}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
