import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function SignupPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const params = searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>{t.auth.createAccount}</CardTitle>
          <CardDescription>{t.auth.signupHint}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/sign-up" className="grid gap-4 sm:grid-cols-2" method="post">
            <Input className="sm:col-span-2" name="fullName" placeholder={t.auth.fullName} required />
            <Input className="sm:col-span-2" name="businessName" placeholder={t.auth.businessName} required />
            <Input name="email" placeholder={t.auth.email} required type="email" />
            <Input name="whatsappNumber" placeholder={t.auth.whatsappNumber} required />
            <Input className="sm:col-span-2" name="password" placeholder={t.auth.password} required type="password" />
            {params.error ? <p className="sm:col-span-2 text-sm text-destructive">{params.error}</p> : null}
            <Button className="sm:col-span-2" type="submit">
              {t.auth.submitSignup}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground">
            <Link href="/login">{t.auth.haveAccount}</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
