import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.4), transparent)',
        }}
        aria-hidden
      />
      <div className="container-wide py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Демо-проект на Next.js 14 · TypeScript · Tailwind</span>
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Сайты, контент и{' '}
            <span className="gradient-text">AI-консультанты</span> на потоке
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl">
            Многостраничный лендинг с продуктами, кейсами, гайдами и потоковым
            AI-консультантом. Технический SEO под классические и AI-поисковики
            из коробки.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Посмотреть продукты
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/cases/orbita-launch"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-accent"
            >
              Открыть кейс
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 text-left sm:grid-cols-4">
            {[
              { value: '14', label: 'дней на запуск' },
              { value: '78%', label: 'автоматических ответов' },
              { value: '1.2с', label: 'первый ответ AI' },
              { value: '90+', label: 'PageSpeed mobile' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
