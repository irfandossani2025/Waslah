import { notFound } from "next/navigation";

import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default async function EditProductPage({
  params
}: {
  params: { id: string };
}) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();
  const { id } = params;
  const product = snapshot.products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.common.edit}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="/api/dashboard/products" className="grid gap-4 md:grid-cols-2" method="post">
          <input name="id" type="hidden" value={product.id} />
          <input name="businessId" type="hidden" value={snapshot.business.id} />
          <Input defaultValue={product.name.en} name="nameEn" placeholder="Name (English)" required />
          <Input defaultValue={product.name.ar} name="nameAr" placeholder="الاسم (العربية)" required />
          <Textarea className="md:col-span-2" defaultValue={product.description.en} name="descriptionEn" placeholder="Description (English)" required />
          <Textarea className="md:col-span-2" defaultValue={product.description.ar} name="descriptionAr" placeholder="الوصف (العربية)" required />
          <Input defaultValue={String(product.price)} min="0" name="price" placeholder="Price" required step="0.01" type="number" />
          <Input defaultValue={product.image_urls[0]} name="imageUrl" placeholder="https://..." required type="url" />
          <Select defaultValue={product.category_id || ""} name="categoryId">
            <option value="">No category</option>
            <option value={product.category_id || ""}>{product.category_id || "Current category"}</option>
          </Select>
          <Select defaultValue={product.status} name="status">
            <option value="active">{t.statuses.active}</option>
            <option value="draft">{t.statuses.draft}</option>
            <option value="archived">{t.statuses.archived}</option>
          </Select>
          <label className="flex items-center gap-3 text-sm">
            <input defaultChecked={product.available} name="available" type="checkbox" />
            {t.common.available}
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input defaultChecked={product.featured} name="featured" type="checkbox" />
            {t.common.featured}
          </label>
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit">{t.common.save}</Button>
          </div>
        </form>
        <form action="/api/dashboard/products" className="mt-4" method="post">
          <input name="id" type="hidden" value={product.id} />
          <input name="intent" type="hidden" value="delete" />
          <Button type="submit" variant="destructive">
            {t.common.delete}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
