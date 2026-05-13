import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ArrowRight, Check } from 'lucide-react';
import { getCase } from '@/lib/content/cases';
import { articleLd, breadcrumbLd } from '@/lib/seo';

const study = getCase('orbita-launch');

export const metadata: Metadata = study
  ? {
      title: study.title,
      description: study.summary,
      alternates: { canonical: `/cases/${study.slug}` },
      openGraph: { type: 'article', title: study.title, description: study.summary },
    }
  : {};

export default function CasePage() {
  if (!study) return notFound();

  const ld = [
    breadcrumbLd([
      { name: 'Главная', url: '/' },
      { name: 'Кейсы', url: '/cases' },
      { name: study.title, url: `/cases/${study.slug}` },
    ]),
    articleLd({
      headline: study.title,
      description: study.summary,
      url: `/cases/${study.slug}`,
      datePublished: study.publishedAt,
    }),
  ];

  return (
    <>
      {ld.map((obj, i) => (
        <Script
          key={i}
          id={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <article className="py-16 sm:py-20">
        <div className="container-tight">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/cases" className="hover:text-foreground">Кейсы</Link>
            <span className="mx-2">/</span>
            <span>Кейс</span>
          </nav>

          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border px-2 py-0.5">
                {study.industry}
              </span>
              <span>{study.duration}</span>
              <span>·</span>
              <time dateTime={study.publishedAt}>
                {new Date(study.publishedAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
            </div>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-4 text-balance text-lg text-muted-foreground">
              {study.client}
            </p>
            <p className="mt-6 text-balance">{study.summary}</p>
          </header>

          <section className="mb-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="text-3xl font-bold text-primary">{m.value}</div>
                  {m.delta && (
                    <div className="mt-1 text-xs font-medium text-green-500">
                      {m.delta}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-muted-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="prose mb-12 max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Задача</h2>
            <p className="text-balance text-muted-foreground">{study.challenge}</p>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Решение</h2>
            <ol className="space-y-3">
              {study.solution.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </div>
                  <p>{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Стек</h2>
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h3 className="text-xl font-bold">Похожая задача?</h3>
            <p className="mt-2 text-muted-foreground">
              Расскажите, что у вас — оценим сроки и стоимость за день.
            </p>
            <Link
              href="/contacts"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Обсудить проект <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
