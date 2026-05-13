import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FlippingCard } from '@/components/ui/flipping-card';
import { GlowCard } from '@/components/ui/spotlight-card';
import { products } from '@/lib/content/products';

export function ProductCards() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="container-wide">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Три продукта — один результат
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Каждый продукт собран на типовой методологии и фиксированных сроках.
            Наведите на карточку, чтобы увидеть подробности.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <GlowCard key={p.slug} glowColor={p.glowColor} height={540} width="100%">
              <FlippingCard
                height={520}
                width="100%"
                frontContent={
                  <div className="flex h-full flex-col justify-between p-7">
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span aria-hidden className="text-2xl">✦</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.tagline}</p>
                    </div>
                    <div>
                      <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                        Для кого
                      </div>
                      <p className="mb-6 text-sm">{p.audience}</p>
                      <div className="text-xs text-muted-foreground">
                        Наведите для подробностей
                      </div>
                    </div>
                  </div>
                }
                backContent={
                  <div className="flex h-full flex-col p-7">
                    <h3 className="mb-3 text-lg font-bold">{p.title}</h3>
                    <div className="mb-4 flex-1 space-y-2 text-sm">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Этапы
                      </div>
                      <ol className="list-decimal space-y-1 pl-4 text-sm">
                        {p.steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="mb-4 space-y-1 text-sm">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Результат
                      </div>
                      <ul className="space-y-1">
                        {p.results.map((r) => (
                          <li key={r} className="text-primary">
                            · {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/products/${p.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Подробнее <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                }
              />
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
