"use client";

import * as React from "react";
import { navItems, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[var(--lobola-bone)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#home"
          className="flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lobola-gold)]"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-lg font-medium text-[var(--lobola-graphite)]">
            {site.name}
          </span>
          <span className="hidden text-xs uppercase tracking-wide text-[var(--lobola-muted-text)] sm:inline">
            Marriage • Family • Legacy
          </span>
        </a>

        <nav className="hidden items-center gap-6 min-[1069px]:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="min-h-[44px] flex items-center text-sm font-medium text-[var(--lobola-warm-gray)] transition-colors hover:text-[var(--lobola-graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lobola-gold)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          variant="outline"
          className="min-h-[44px] min-w-[44px] min-[1069px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      <div
        id="mobile-nav"
        className={cn("min-[1069px]:hidden", open ? "block" : "hidden")}
      >
        <Separator />
        <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6" aria-label="Mobile">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-sm font-medium text-[var(--lobola-warm-gray)] hover:text-[var(--lobola-graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lobola-gold)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

