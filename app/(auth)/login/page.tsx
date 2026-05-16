import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function LoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const params = searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t.auth.welcomeBack}</CardTitle>
          <CardDescription>{t.auth.loginHint}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/sign-in" className="space-y-4" method="post">
            <Input name="email" placeholder={t.auth.email} required type="email" />
            <Input name="password" placeholder={t.auth.password} required type="password" />
            {params.error ? <p className="text-sm text-destructive">{params.error}</p> : null}
            <Button className="w-full" type="submit">
              {t.auth.submitLogin}
            </Button>
          </form>
          <div className="mt-4 flex justify-between text-sm text-muted-foreground">
            <Link href="/forgot-password">{t.auth.forgotPassword}</Link>
            <Link href="/signup">{t.auth.noAccount}</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
