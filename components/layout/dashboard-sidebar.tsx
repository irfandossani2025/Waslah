"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, LayoutDashboard, Package, ShoppingBag, ShieldCheck, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale, UserRole } from "@/types/domain";

const navIcons = {
  dashboard: LayoutDashboard,
  products: Package,
  orders: ShoppingBag,
  customers: Users,
  analytics: BarChart3,
  settings: Building2,
  admin: ShieldCheck
};

export function DashboardSidebar({
  locale,
  role
}: {
  locale: Locale;
  role: UserRole;
}) {
  const pathname = usePathname();
  const t = getDictionary(locale);

  const items = [
    { href: "/dashboard", label: t.common.dashboard, icon: navIcons.dashboard },
    { href: "/dashboard/products", label: t.common.products, icon: navIcons.products },
    { href: "/dashboard/orders", label: t.common.orders, icon: navIcons.orders },
    { href: "/dashboard/customers", label: t.common.customers, icon: navIcons.customers },
    { href: "/dashboard/analytics", label: t.common.analytics, icon: navIcons.analytics },
    { href: "/dashboard/settings", label: t.common.settings, icon: navIcons.settings }
  ];

  if (role === "admin") {
    items.push({ href: "/dashboard/admin", label: t.common.admin, icon: navIcons.admin });
  }

  return (
    <aside className="surface hidden w-72 shrink-0 p-4 lg:block">
      <div className="mb-6 flex items-center justify-between px-2">
        <div>
          <div className="text-sm text-muted-foreground">{t.common.appName}</div>
          <div className="text-lg font-semibold">{t.common.dashboard}</div>
        </div>
        <Badge variant="secondary">{role === "admin" ? t.common.admin : t.dashboard.demoMode}</Badge>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              href={item.href}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
