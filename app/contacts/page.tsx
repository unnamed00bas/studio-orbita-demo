'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Send } from 'lucide-react';

export default function ContactsPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container-tight">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          <span className="mx-2">/</span>
          <span>Контакты</span>
        </nav>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Обсудим проект
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Расскажите коротко о задаче. Ответим в течение рабочего дня.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            {sent ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Спасибо!</h2>
                <p className="mt-2 text-muted-foreground">
                  Это демо-форма — реальные заявки не отправляются. В боевом
                  проекте здесь шёл бы POST на /api/contact с интеграцией в CRM.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Задача
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Коротко: что нужно, какие сроки и бюджет"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Отправить <Send className="h-4 w-4" />
                </button>
                <p className="text-xs text-muted-foreground">
                  Это демо-форма без реальной отправки. Замените на свою
                  API-route с интеграцией CRM или email.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-6 rounded-2xl border border-border bg-card p-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Что важно для нас
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Фиксированные сроки и стоимость</li>
                <li>Прозрачные этапы с регулярными демо</li>
                <li>Передача исходников и документации</li>
                <li>Обучение вашей команды</li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Это демо
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Контакты в этой форме — условные. Демо-проект показывает, как
                выглядит маркетинговая воронка студии.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
