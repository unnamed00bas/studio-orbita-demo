import Link from 'next/link';
import { ArrowRight, MessageCircle, Zap, Database, Server } from 'lucide-react';

export function AssistantTeaser() {
  const features = [
    {
      icon: Zap,
      title: 'Стриминг ответов',
      text: 'Первое слово через 1.2 секунды. Server-Sent Events, без websockets.',
    },
    {
      icon: Database,
      title: 'База знаний из вашего контента',
      text: 'Системный промпт собирается из реальных страниц сайта. Без галлюцинаций.',
    },
    {
      icon: Server,
      title: 'Anthropic Messages API',
      text: 'Claude 4.7 на бэкенде. Опционально — fallback на стаб без API-ключа.',
    },
  ];

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              <MessageCircle className="h-3.5 w-3.5" />
              Попробуйте прямо сейчас
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              AI-консультант, который правда отвечает на вопросы
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              Нажмите на иконку чата в правом нижнем углу и спросите про
              продукты, цены или сроки. Ответы — на лету, из реальной базы
              знаний этого сайта.
            </p>
            <div className="mt-8 space-y-4">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {f.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/guide/start"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Гайд: как запустить такого же
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <span aria-hidden>✦</span>
              </div>
              <div>
                <div className="text-sm font-semibold">AI-консультант</div>
                <div className="text-xs text-muted-foreground">Студия Орбита</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-muted p-3 text-foreground">
                Здравствуйте! Я знаю всё о продуктах студии. Спросите — отвечу.
              </div>
              <div className="ml-8 rounded-xl bg-primary p-3 text-primary-foreground">
                Сколько стоит AI-консультант?
              </div>
              <div className="rounded-xl bg-muted p-3">
                AI-консультант — от 49 000 ₽. Включает базу знаний из ваших
                материалов, виджет на сайт и интеграцию с CRM. Срок запуска —
                от 14 дней.
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <span className="flex-1">Спросите что-нибудь…</span>
              <span className="text-primary">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
