import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function VerifyEmailPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t.auth.verifyEmail}</CardTitle>
          <CardDescription>{t.auth.verifyHint}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">{t.nav.signIn}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
