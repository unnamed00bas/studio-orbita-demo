import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Clock, BarChart3 } from 'lucide-react';
import { getGuide } from '@/lib/content/guides';
import { breadcrumbLd, howToLd } from '@/lib/seo';

const guide = getGuide('start');

export const metadata: Metadata = guide
  ? {
      title: guide.title,
      description: guide.description,
      alternates: { canonical: `/guide/${guide.slug}` },
      openGraph: { type: 'article', title: guide.title, description: guide.description },
    }
  : {};

export default function GuidePage() {
  if (!guide) return notFound();

  const ld = [
    breadcrumbLd([
      { name: 'Главная', url: '/' },
      { name: 'Гайды', url: '/guide' },
      { name: guide.title, url: `/guide/${guide.slug}` },
    ]),
    howToLd(
      guide.title,
      guide.steps.map((s) => ({ name: s.title, text: s.description }))
    ),
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
            <Link href="/guide" className="hover:text-foreground">Гайды</Link>
            <span className="mx-2">/</span>
            <span>Гайд</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-balance text-lg text-muted-foreground">
              {guide.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {guide.duration}
              </span>
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Уровень: {guide.level}
              </span>
            </div>
          </header>

          <nav aria-label="Шаги гайда" className="mb-12 rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 text-sm font-semibold">Шаги</div>
            <ol className="space-y-2 text-sm">
              {guide.steps.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#step-${i + 1}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-12">
            {guide.steps.map((s, i) => (
              <section key={s.title} id={`step-${i + 1}`} className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                    {i + 1}
                  </div>
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                </div>
                <p className="mb-4 text-muted-foreground">{s.description}</p>
                <ul className="space-y-2">
                  {s.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm">{d}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
