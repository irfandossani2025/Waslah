import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function SettingsPage({
  searchParams
}: {
  searchParams: { saved?: string; error?: string };
}) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();
  const params = searchParams;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.settingsTitle}</CardTitle>
          <CardDescription>{t.dashboard.settingsSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/dashboard/profile" className="grid gap-4 md:grid-cols-2" method="post">
            <input name="businessId" type="hidden" value={snapshot.business.id} />
            <Input defaultValue={snapshot.business.name.en} name="nameEn" placeholder="Business name (English)" required />
            <Input defaultValue={snapshot.business.name.ar} name="nameAr" placeholder="اسم النشاط (العربية)" required />
            <Textarea className="md:col-span-2" defaultValue={snapshot.business.description.en} name="descriptionEn" placeholder="Description (English)" required />
            <Textarea className="md:col-span-2" defaultValue={snapshot.business.description.ar} name="descriptionAr" placeholder="الوصف (العربية)" required />
            <Input defaultValue={snapshot.business.address.en} name="addressEn" placeholder="Address (English)" required />
            <Input defaultValue={snapshot.business.address.ar} name="addressAr" placeholder="العنوان (العربية)" required />
            <Input defaultValue={snapshot.business.whatsapp_number} name="whatsappNumber" placeholder="WhatsApp number" required />
            <Input defaultValue={snapshot.business.instagram_handle} name="instagramHandle" placeholder="@instagram" required />
            <Input defaultValue={snapshot.business.logo_url} name="logoUrl" placeholder="Logo URL" required type="url" />
            <Input defaultValue={snapshot.business.banner_url} name="bannerUrl" placeholder="Banner URL" required type="url" />
            <Input defaultValue={snapshot.business.currency} name="currency" placeholder="Currency" required />
            {params.saved ? (
              <p className="md:col-span-2 text-sm text-primary">
                {locale === "en" ? "Business profile updated." : "تم تحديث ملف النشاط."}
              </p>
            ) : null}
            {params.error ? <p className="md:col-span-2 text-sm text-destructive">{params.error}</p> : null}
            <Button className="md:col-span-2" type="submit">
              {t.common.save}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.managePlan}</CardTitle>
          <CardDescription>{t.admin.subscriptions}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-secondary p-4">
            <div className="text-sm text-muted-foreground">{t.common.plan}</div>
            <div className="text-2xl font-semibold">{t.plans[snapshot.subscription.plan].name}</div>
          </div>
          <div className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
            {locale === "en"
              ? `Renewal: ${new Date(snapshot.subscription.renewalDate).toLocaleDateString("en-OM")}`
              : `التجديد: ${new Date(snapshot.subscription.renewalDate).toLocaleDateString("ar-OM")}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
