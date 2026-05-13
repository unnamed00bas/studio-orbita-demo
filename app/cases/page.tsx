import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { cases } from '@/lib/content/cases';

export const metadata: Metadata = {
  title: 'Кейсы',
  description: 'Реальные проекты студии: задача, решение, метрики, стек.',
  alternates: { canonical: '/cases' },
};

export default function CasesPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-wide">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          <span className="mx-2">/</span>
          <span>Кейсы</span>
        </nav>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Кейсы
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Что мы реально делали — с цифрами, задачей и решением.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40"
            >
              <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-border px-2 py-0.5">
                  {c.industry}
                </span>
                <span>{c.duration}</span>
              </div>
              <h2 className="mb-3 text-2xl font-bold">{c.title}</h2>
              <p className="mb-6 text-muted-foreground">{c.summary}</p>
              <div className="mb-6 grid grid-cols-2 gap-4">
                {c.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-bold text-primary">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                Читать кейс <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
