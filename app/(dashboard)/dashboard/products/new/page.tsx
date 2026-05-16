import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default async function NewProductPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.dashboard.addProduct}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="/api/dashboard/products" className="grid gap-4 md:grid-cols-2" method="post">
          <input name="businessId" type="hidden" value={snapshot.business.id} />
          <Input name="nameEn" placeholder="Name (English)" required />
          <Input name="nameAr" placeholder="الاسم (العربية)" required />
          <Textarea className="md:col-span-2" name="descriptionEn" placeholder="Description (English)" required />
          <Textarea className="md:col-span-2" name="descriptionAr" placeholder="الوصف (العربية)" required />
          <Input min="0" name="price" placeholder="Price" required step="0.01" type="number" />
          <Input name="imageUrl" placeholder="https://..." required type="url" />
          <Select defaultValue={snapshot.products[0]?.category_id || ""} name="categoryId">
            <option value="">No category</option>
            {snapshot.products
              .map((product) => product.category_id)
              .filter(Boolean)
              .filter((value, index, list) => list.indexOf(value) === index)
              .map((categoryId) => (
                <option key={categoryId} value={categoryId || ""}>
                  {categoryId}
                </option>
              ))}
          </Select>
          <Select defaultValue="active" name="status">
            <option value="active">{t.statuses.active}</option>
            <option value="draft">{t.statuses.draft}</option>
            <option value="archived">{t.statuses.archived}</option>
          </Select>
          <label className="flex items-center gap-3 text-sm">
            <input defaultChecked name="available" type="checkbox" />
            {t.common.available}
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input name="featured" type="checkbox" />
            {t.common.featured}
          </label>
          <Button className="md:col-span-2" type="submit">
            {t.common.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
