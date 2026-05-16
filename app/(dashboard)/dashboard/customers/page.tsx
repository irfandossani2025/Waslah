import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function CustomersPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t.dashboard.customersTitle}</h1>
        <p className="mt-2 text-muted-foreground">{t.dashboard.customersSubtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {snapshot.customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle>{customer.full_name}</CardTitle>
              <CardDescription>{customer.phone}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>{t.dashboard.totalOrders}</span>
                <span>{customer.total_orders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.dashboard.totalSales}</span>
                <span>{formatCurrency(customer.total_spent, snapshot.business.currency, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.common.date}</span>
                <span>{formatDate(customer.created_at, locale)}</span>
              </div>
              {customer.notes ? <p className="rounded-2xl bg-secondary p-3 text-muted-foreground">{customer.notes}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
