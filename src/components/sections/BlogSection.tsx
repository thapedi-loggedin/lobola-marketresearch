"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BlogSection() {
  // TODO: Replace with actual blog posts from CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Customary Marriage in South Africa",
      excerpt:
        "Learn about the legal requirements and cultural significance of customary marriages in South Africa, including registration processes and your rights.",
      date: "January 15, 2026",
      category: "Marriage",
    },
    {
      id: 2,
      title: "Prenuptial Agreements: What You Need to Know",
      excerpt:
        "A comprehensive guide to Antenuptial Contracts (ANC) in South Africa, including the different types and when you might need one.",
      date: "January 10, 2026",
      category: "Legal",
    },
    {
      id: 3,
      title: "Estate Planning for South African Families",
      excerpt:
        "Protect your family's future with proper estate planning. Learn about wills, trusts, and estate administration in South Africa.",
      date: "January 5, 2026",
      category: "Estate Planning",
    },
  ];

  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--lobola-muted-text)] hover:text-[var(--lobola-text)] transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            Blog
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            Insights & Guidance
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--lobola-warm-gray)]">
            Expert advice and information about marriage, family law, and estate
            planning in South Africa.
          </p>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

          <div className="mt-8 space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-md border border-border bg-white p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-[var(--lobola-gold)]">
                        {post.category}
                      </span>
                      <span className="text-xs text-[var(--lobola-muted-text)]">
                        {post.date}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[var(--lobola-graphite)] mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-6 text-[var(--lobola-warm-gray)]">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 min-h-[44px]"
                  asChild
                >
                  <Link href={`/blog/${post.id}`}>Read more →</Link>
                </Button>
              </article>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="rounded-md border border-border bg-white p-8 text-center">
              <p className="text-sm text-[var(--lobola-muted-text)]">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
