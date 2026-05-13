import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import { posts } from '@/lib/content/blog';

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Статьи о техническом SEO, GEO, AI-консультантах и контент-маркетинге.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-wide">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          <span className="mx-2">/</span>
          <span>Блог</span>
        </nav>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Блог
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Разбираем то, что реально работает в SEO/GEO и AI-проектах в 2026 году.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-border px-2 py-0.5">
                  {p.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {p.readingTime}
                </span>
                <time dateTime={p.publishedAt}>
                  {new Date(p.publishedAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h2 className="mb-3 text-2xl font-bold">{p.title}</h2>
              <p className="mb-6 text-muted-foreground">{p.excerpt}</p>
              <div className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                Читать <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
