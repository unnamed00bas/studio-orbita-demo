import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock, BarChart3 } from 'lucide-react';
import { guides } from '@/lib/content/guides';

export const metadata: Metadata = {
  title: 'Гайды',
  description:
    'Пошаговые инструкции: как самостоятельно запустить AI-консультанта, контент-завод и многое другое.',
  alternates: { canonical: '/guide' },
};

export default function GuidesPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-wide">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          <span className="mx-2">/</span>
          <span>Гайды</span>
        </nav>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Гайды
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Пошаговые инструкции. Без воды, с конкретными командами и примерами.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="group rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40"
            >
              <h2 className="mb-3 text-2xl font-bold">{g.title}</h2>
              <p className="mb-6 text-muted-foreground">{g.description}</p>
              <div className="mb-6 flex gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {g.duration}
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {g.level}
                </div>
              </div>
              <div className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                Открыть гайд <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
