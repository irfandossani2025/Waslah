import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  badge,
  title,
  description,
  align = "left"
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {badge ? <Badge className="mb-4 w-fit" variant="secondary">{badge}</Badge> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
