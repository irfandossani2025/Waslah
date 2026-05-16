"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  className,
  children,
  side = "right"
}: React.PropsWithChildren<{ className?: string; side?: "right" | "left" }>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" />
      <Dialog.Content
        className={cn(
          "fixed top-0 z-50 h-full w-full max-w-md border-l border-border bg-white p-6 shadow-soft outline-none",
          side === "right" ? "right-0" : "left-0 border-r border-l-0",
          className
        )}
      >
        <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary">
          <X className="h-4 w-4" />
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-6 space-y-1", className)} {...props} />
);

export const SheetTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props} />
);

export const SheetDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
