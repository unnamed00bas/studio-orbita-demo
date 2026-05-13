import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { ProductCards } from '@/components/sections/ProductCards';
import { AssistantTeaser } from '@/components/sections/AssistantTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCards />
      <AssistantTeaser />

      <section className="border-b border-border py-20">
        <div className="container-tight text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Готовы обсудить проект?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Расскажите о задаче — оценим срок и стоимость в течение дня.
          </p>
          <Link
            href="/contacts"
            className="mt-8 inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Оставить заявку
          </Link>
        </div>
      </section>
    </>
  );
}
