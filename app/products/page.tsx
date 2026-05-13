import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/content/products';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Продукты',
  description:
    'AI-консультанты, сайты на Next.js, контент-завод. Фиксированные сроки и прозрачные цены.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  const ld = breadcrumbLd([
    { name: 'Главная', url: '/' },
    { name: 'Продукты', url: '/products' },
  ]);
  return (
    <>
      <Script
        id="ld-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <section className="border-b border-border py-16 sm:py-20">
        <div className="container-wide">
          <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">/</span>
            <span>Продукты</span>
          </nav>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Продукты
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-muted-foreground">
            Три типовых продукта, которые мы делаем по фиксированным методологиям
            и срокам. Не «разработка под ключ», а конкретный результат.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:border-primary/40"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-2xl">
                ✦
              </div>
              <h2 className="mb-2 text-xl font-bold">{p.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mb-4 text-sm">
                Цена от{' '}
                <span className="font-semibold text-primary">
                  {p.priceFrom.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                Подробнее <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
