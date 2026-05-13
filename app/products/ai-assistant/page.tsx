import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ArrowRight, Check } from 'lucide-react';
import { getProduct } from '@/lib/content/products';
import { breadcrumbLd, productLd, faqLd } from '@/lib/seo';

const product = getProduct('ai-assistant');

export const metadata: Metadata = product
  ? {
      title: product.title,
      description: product.description,
      alternates: { canonical: `/products/${product.slug}` },
      openGraph: {
        title: product.title,
        description: product.description,
        url: `/products/${product.slug}`,
      },
    }
  : {};

const faq = [
  {
    question: 'Сколько времени занимает запуск AI-консультанта?',
    answer:
      'От 14 дней. За это время мы собираем базу знаний, настраиваем сценарии, подключаем виджет и интеграцию с CRM, обучаем команду.',
  },
  {
    question: 'Что если AI не знает ответа?',
    answer:
      'Бот честно говорит, что не знает, и предлагает оставить заявку. В дашборде вы видите такие случаи и можете дополнить базу знаний.',
  },
  {
    question: 'Нужен ли свой API-ключ Anthropic?',
    answer:
      'На демо — да, без ключа чат отвечает заглушкой. В коммерческой версии работаем по нашему ключу с месячным лимитом запросов.',
  },
  {
    question: 'Можно ли поменять характер бота?',
    answer:
      'Да. Системный промпт — это просто файл, который вы редактируете. Можно сделать формальный, дружелюбный или экспертный тон.',
  },
];

export default function ProductAIAssistantPage() {
  if (!product) return notFound();

  const ld = [
    breadcrumbLd([
      { name: 'Главная', url: '/' },
      { name: 'Продукты', url: '/products' },
      { name: product.title, url: `/products/${product.slug}` },
    ]),
    productLd({
      name: product.title,
      description: product.description,
      url: `/products/${product.slug}`,
      priceFrom: product.priceFrom,
    }),
    faqLd(faq),
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

      <section className="border-b border-border py-16 sm:py-20">
        <div className="container-wide">
          <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-foreground">Продукты</Link>
            <span className="mx-2">/</span>
            <span>{product.shortTitle}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 text-balance text-lg text-muted-foreground">
                {product.tagline}
              </p>
              <p className="mt-6 text-balance">{product.description}</p>
            </div>

            <aside className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Стоимость
                </div>
                <div className="mt-1 text-3xl font-bold text-primary">
                  от {product.priceFrom.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Срок
                </div>
                <div className="mt-1 font-semibold">от 14 дней</div>
              </div>
              <Link
                href="/contacts"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Обсудить проект <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="container-wide">
          <h2 className="mb-8 text-3xl font-bold">Как работаем</h2>
          <ol className="grid gap-6 md:grid-cols-2">
            {product.steps.map((step, i) => (
              <li key={step} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </div>
                <p className="text-balance">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Результаты, которые получают клиенты</h2>
            <ul className="space-y-3">
              {product.results.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-sm font-semibold text-muted-foreground">Кейс</div>
            <h3 className="mt-2 text-xl font-bold">
              Запуск AI-консультанта для онлайн-школы за 14 дней
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Конверсия в заявку выросла на 27%, время первого ответа упало с
              12 минут до 1.2 секунды.
            </p>
            <Link
              href="/cases/orbita-launch"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Читать кейс <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-tight">
          <h2 className="mb-8 text-3xl font-bold">Частые вопросы</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border bg-card p-5 transition open:border-primary/30"
              >
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="mr-2 inline-block transition group-open:rotate-90">
                    ›
                  </span>
                  {item.question}
                </summary>
                <p className="mt-3 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
