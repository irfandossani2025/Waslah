"use client";

import { useMemo, useState } from "react";

import { StatusPill } from "@/components/shared/status-pill";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale, Order, OrderStatus } from "@/types/domain";

export function OrdersBoard({ locale, currency, orders }: { locale: Locale; currency: string; orders: Order[] }) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesQuery =
        order.customer_name.toLowerCase().includes(query.toLowerCase()) ||
        order.customer_phone.toLowerCase().includes(query.toLowerCase()) ||
        order.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || order.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, status]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>{t.dashboard.orderManagerTitle}</CardTitle>
          <CardDescription>{t.dashboard.orderManagerSubtitle}</CardDescription>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input onChange={(event) => setQuery(event.target.value)} placeholder={t.common.search} value={query} />
          <Select onChange={(event) => setStatus(event.target.value as typeof status)} value={status}>
            <option value="all">{t.common.all}</option>
            <option value="new">{t.statuses.new}</option>
            <option value="confirmed">{t.statuses.confirmed}</option>
            <option value="preparing">{t.statuses.preparing}</option>
            <option value="delivered">{t.statuses.delivered}</option>
            <option value="cancelled">{t.statuses.cancelled}</option>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.common.order}</TableHead>
              <TableHead>{t.common.customer}</TableHead>
              <TableHead>{t.common.status}</TableHead>
              <TableHead>{t.storefront.total}</TableHead>
              <TableHead>{t.common.date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.items.length} {t.placeholders.orderItems}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="text-xs text-muted-foreground">{order.customer_phone}</div>
                </TableCell>
                <TableCell>
                  <StatusPill locale={locale} status={order.status} />
                </TableCell>
                <TableCell>{formatCurrency(order.total_amount, currency, locale)}</TableCell>
                <TableCell>{formatDate(order.created_at, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
