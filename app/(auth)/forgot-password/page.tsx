import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams: { error?: string; sent?: string };
}) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const params = searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t.auth.forgotPassword}</CardTitle>
          <CardDescription>{t.auth.forgotHint}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/forgot-password" className="space-y-4" method="post">
            <Input name="email" placeholder={t.auth.email} required type="email" />
            {params.error ? <p className="text-sm text-destructive">{params.error}</p> : null}
            {params.sent ? (
              <p className="text-sm text-primary">
                {locale === "en" ? "Reset link sent to your email." : "تم إرسال رابط الاستعادة إلى بريدك."}
              </p>
            ) : null}
            <Button className="w-full" type="submit">
              {t.auth.submitReset}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground">
            <Link href="/login">{t.nav.signIn}</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
