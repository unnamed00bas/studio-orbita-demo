# Студия Орбита — демо-проект

[![Production: promaren.ru](https://img.shields.io/badge/Production-promaren.ru-0573b5?style=flat&labelColor=000000)](https://promaren.ru)
[![Author: Marina Pogodina](https://img.shields.io/badge/Author-Marina%20Pogodina-3aa7e0?style=flat&labelColor=000000)](https://promaren.ru/about/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Anthropic API](https://img.shields.io/badge/Anthropic-Messages%20API-d97757)](https://www.anthropic.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **🌍 Live demo:** [studio-orbita-demo.vercel.app](https://studio-orbita-demo.vercel.app) &nbsp;·&nbsp; **🏢 Production:** [promaren.ru](https://promaren.ru) &nbsp;·&nbsp; **👤 Author:** [Marina Pogodina](https://promaren.ru/about/)

Многостраничный сайт-визитка для условной «Студии Орбита» на **Next.js 14 + TypeScript + Tailwind CSS** с потоковым **AI-консультантом**, техническим SEO и оптимизацией под AI-поисковики (GEO).

> 🎯 **Зачем этот репозиторий.** Открытый proof-of-work автора [PROMAREN](https://promaren.ru) — упрощённый публичный клон стека, на котором построены коммерческие AI-проекты студии. Боевой код под NDA; здесь — фиктивный бренд «Студия Орбита», но **архитектурные решения, паттерны кода и инфраструктура — рабочие**. Можно склонировать, прочитать [Design decisions](#design-decisions--почему-так) и запустить локально за минуту. Все цены, кейсы и контакты в коде — условные.

> **English TL;DR** — A multi-page demo site for a fictional studio brand, built with **Next.js 14 App Router**, **TypeScript** (strict), **Tailwind CSS**, and a streaming **AI consultant** powered by the **Anthropic Messages API** with prompt caching. Includes full technical SEO and **GEO (Generative Engine Optimization)** — JSON-LD (Organization, Article, Product, FAQPage, HowTo, BreadcrumbList), dynamic sitemap, and `robots.txt` with explicit allow for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, YandexBot). Built as an **open-source proof-of-work** by [Marina Pogodina](https://promaren.ru/about/), founder of [PROMAREN](https://promaren.ru) — 16+ years in IT audit & InfoSec (Aeroflot, MTS, X5, Deloitte, PwC), now building ethical AI automation. All prices, cases, and contacts in this demo are fictional. MIT licensed. See [About the author](#-об-авторе).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/unnamed00bas/studio-orbita-demo&env=ANTHROPIC_API_KEY&envDescription=Anthropic%20API%20key%20for%20the%20streaming%20AI%20consultant.%20Optional%20%E2%80%94%20without%20it%20the%20chat%20falls%20back%20to%20a%20stub%20response.&envLink=https://console.anthropic.com/)

---

## Что внутри

| Часть | Чем интересна |
|---|---|
| **Главная** | Hero с метриками, 3D-flipping карточки продуктов со spotlight-эффектом, секция AI-консультанта |
| **Продукты** | Список + 1 детальная страница (`/products/ai-assistant`) с этапами, результатами, FAQ |
| **Кейсы** | Список + 1 кейс (`/cases/orbita-launch`) с метриками, стеком, задачей и решением |
| **Гайды** | Список + 1 пошаговый гайд (`/guide/start`) с якорной навигацией |
| **Блог** | Список + 1 статья (`/blog/ai-content-funnel`) про SEO/GEO под AI-поисковики |
| **Контакты** | Форма-демо |
| **AI-консультант** | Floating-виджет (правый нижний угол), стриминг через **Anthropic Messages API + prompt caching**, fallback-заглушка без ключа |

### Технический SEO + GEO

- `app/sitemap.ts` — динамическая sitemap.xml из контента
- `app/robots.ts` — явное разрешение AI-краулерам (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, YandexBot)
- **JSON-LD**: `Organization`, `BreadcrumbList`, `Article`, `Product` (с `AggregateOffer`), `FAQPage`, `HowTo`
- Метатеги Open Graph, canonical, robots
- Тёмная тема, адаптив, accessibility-friendly разметка
- HTTP-заголовки безопасности (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)

---

## Стек

- **Next.js 14** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** с CSS-переменными темы
- **Framer Motion**, **Lucide React** — анимации и иконки
- **`@anthropic-ai/sdk`** — потоковая генерация ответов AI-консультанта
- **Server-Sent Events** — стриминг от API route к клиенту

---

## Быстрый старт

```bash
npm install
cp .env.example .env.local
# (опционально) добавьте ANTHROPIC_API_KEY для рабочего AI-консультанта

npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

> **Без `ANTHROPIC_API_KEY`** чат отвечает дружелюбной заглушкой и подсказывает, что нужно для боевого режима.

### Production-сборка

```bash
npm run build && npm start
```

---

## AI-консультант: как устроено

```
[ChatWidget] → клик → [ChatPanel]
       ↓
[useChat hook] → POST /api/chat { messages: [...] }
       ↓
[/api/chat/route.ts]
   ├─ валидация (роли, длина)
   ├─ собирает системный промпт из lib/kb.ts
   │   (продукты + кейсы + гайды + статьи + контакты)
   ├─ Anthropic Messages API со стримингом
   │   и cache_control: { type: 'ephemeral' } на системном промпте
   │   (база знаний кэшируется ~5 минут, ~0.1x стоимости при повторных вызовах)
   └─ форвардит дельты как SSE → клиенту
       ↓
[useChat] парсит SSE, обновляет сообщение в реальном времени
```

**Дефолтная модель:** `claude-opus-4-7` (переопределяется через `ANTHROPIC_MODEL`). Для скорости / экономии можно поставить `claude-haiku-4-5`.

Системный промпт собирается **детерминированно** из контента в `lib/content/` — это значит, что кэш работает корректно (нет таймстампов, нет нестабильных полей).

---

## Структура проекта

```
studio-demo/
├── app/
│   ├── layout.tsx                # Root layout: Header/Footer/ChatWidget, JSON-LD Organization
│   ├── page.tsx                  # Главная
│   ├── globals.css               # Theme variables + утилитные классы
│   ├── sitemap.ts                # Динамическая sitemap.xml
│   ├── robots.ts                 # robots.txt с разрешением AI-краулеров
│   ├── not-found.tsx             # 404
│   ├── api/chat/route.ts         # Стриминговый AI-консультант (SSE)
│   ├── products/                 # /products + /products/ai-assistant
│   ├── cases/                    # /cases + /cases/orbita-launch
│   ├── guide/                    # /guide + /guide/start
│   ├── blog/                     # /blog + /blog/ai-content-funnel
│   └── contacts/                 # /contacts (демо-форма)
├── components/
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # Hero, ProductCards, AssistantTeaser
│   ├── chat/                     # ChatWidget, ChatPanel, useChat (стриминг)
│   └── ui/                       # FlippingCard (3D), GlowCard (spotlight)
├── lib/
│   ├── seo.ts                    # JSON-LD генераторы + константы сайта
│   ├── kb.ts                     # Системный промпт + база знаний для чата
│   ├── utils.ts                  # cn() helper
│   └── content/                  # products, cases, guides, blog data
└── public/                       # Статика
```

---

## Design decisions — почему так

Несколько технических решений, которые принимались осознанно. Если вы рассматриваете это как референс — вот контекст.

### 1. SSE вместо WebSocket для чата

Чат — это **однонаправленный стриминг** (сервер шлёт дельты ответа клиенту). WebSocket был бы избыточен: для него нужен upgrade-handshake, ручное переподключение, отдельный sticky-routing на CDN. SSE — это обычный HTTP-ответ, работает через любые прокси и CDN из коробки, переподключение умеет браузер.

```ts
// app/api/chat/route.ts — простой ReadableStream, без отдельной инфраструктуры
return new Response(stream, {
  headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
});
```

### 2. Детерминированный системный промпт под prompt caching

Anthropic кэширует префикс запроса (system + tools + messages) — но только если **байты префикса идентичны**. Один `new Date()` в системном промпте — и кэш промахивается каждый раз. Поэтому база знаний (`lib/kb.ts`) собирается из статичных TypeScript-объектов в `lib/content/` без таймстампов и UUID'ов. Результат: после первого запроса все последующие в пределах 5 минут читают системный промпт из кэша по ~0.1× от обычной цены.

### 3. Server Components по умолчанию, Client Components только где нужно

`'use client'` стоит только в трёх местах: `Header` (state мобильного меню), `Chat*` (хуки + fetch), `Contacts` (форма). Остальное — Server Components: страницы продуктов/кейсов/блога рендерятся на сервере и шипятся как HTML без JS. First Load JS главной — **~106 KB**, что для проекта с 16 маршрутами очень неплохо.

### 4. JSON-LD централизованно в `lib/seo.ts`

Структурированные данные могли бы быть размазаны по разметке (microdata, RDFa). Вместо этого — типизированные генераторы (`articleLd`, `productLd`, `faqLd`, ...) в одном файле, одна точка истины для формы каждой сущности. Встраиваются через `next/script` в `<head>`. Менять схему — в одном месте, не по 10 файлам.

### 5. Fail-soft AI-консультант

Без `ANTHROPIC_API_KEY` чат не падает, а отвечает дружелюбной заглушкой и объясняет, что нужно настроить. Демки, которые ломаются на отсутствующих env-переменных, — типичная боль. Здесь любой может склонировать репо и запустить за минуту.

```ts
if (!apiKey) {
  return sseStream(stubResponse()); // та же SSE-форма ответа, что и у настоящего чата
}
```

### 6. Tailwind с CSS-переменными вместо theme-библиотеки

`--background`, `--primary` и т.д. — HSL-компоненты в `globals.css`. Tailwind дёргает их через `bg-primary`. Тёмная тема — это один класс `dark` на `<html>`. Никаких `theme-provider`, `next-themes`, рантайм-зависимостей.

---

## Что показывает этот проект как навык

- **Next.js 14 App Router** — RSC по умолчанию, Client Components только где нужно
- **TypeScript strict mode** — всё типизировано, никаких `any`
- **Server-Sent Events streaming** — без websockets, low-latency UX
- **Prompt caching** на стороне Anthropic — реальная экономия токенов
- **JSON-LD structured data** — Product, Article, FAQ, HowTo, BreadcrumbList, Organization
- **GEO (Generative Engine Optimization)** — настройка под AI-поисковики
- **Tailwind + CSS variables** — темизация без рантайм-зависимостей
- **3D CSS transforms + GPU-ускорение** — карточки с переворотом без библиотек

---

## Roadmap

Что можно докрутить, если развивать как реальный шаблон:

- [ ] Unit-тесты на `/api/chat` (валидация, парсинг SSE) — Vitest
- [ ] Persisting истории чата в `localStorage` (сейчас сбрасывается на reload)
- [ ] Rate limiting на `/api/chat` — Upstash Redis или Vercel KV
- [ ] Dynamic OG-картинки на статью / кейс через `@vercel/og`
- [ ] i18n (next-intl) — English/Russian
- [ ] RSS-feed для `/blog`
- [ ] Светлая тема в `localStorage` (сейчас всегда тёмная)
- [ ] E2E-сценарий «открыть чат → задать вопрос → получить ответ» (Playwright)

---

## Деплой на Vercel

Самый быстрый путь:

1. Запушьте репозиторий в GitHub
2. На [vercel.com/new](https://vercel.com/new) → Import Git Repository → выберите репо
3. В Environment Variables добавьте:
   - `ANTHROPIC_API_KEY` — ключ с [console.anthropic.com](https://console.anthropic.com/) (опционально)
   - `NEXT_PUBLIC_SITE_URL` — финальный URL (опционально, для корректных canonical и sitemap)
4. Deploy

Также проект работает на любом Node.js-хостинге (`npm run build && npm start`) и в Docker.

---

## 👤 Об авторе

**Marina Pogodina** — founder & Head of AI & Automation в [**PROMAREN**](https://promaren.ru), экосистеме content & process automation с compliance-first архитектурой.

### Бэкграунд

- **16+ лет** в IT-аудите, риск-менеджменте и информационной безопасности
- **200+ проведённых аудитов** в крупном бизнесе: **МТС, Аэрофлот, X5 Retail Group, Renova, Ашан, ТРАСТ**
- Проходила внешние аудиты **Deloitte** (SOX в МТС) и **PwC** (Quality Assurance в X5)
- Эксперт по **SOX, COBIT 2019, COSO, ISO/IEC 27001, 152-ФЗ, GDPR**

### Сегодня — PROMAREN

Объединяю аудиторскую дисциплину и LLM-агентов: RAG-системы, AI-консультанты на Claude / GPT, автоматизация процессов на n8n / Make / Zapier, клиентские интерфейсы на Next.js + Supabase. White-data архитектура под РФ.

| Метрика | Значение |
|---|---|
| Сокращение ручного труда в проектах автоматизации | **до 85 %** |
| Срок окупаемости внедрения | **2–4 недели** |
| Опыт в IT-аудите / ИБ | **16+ лет** |

**Стек:** Python · TypeScript / JavaScript · Next.js · Supabase · Anthropic API · n8n · Make · Zapier · Cursor

### Что показывает этот репозиторий работодателю

- Я закрываю стек **от архитектуры до деплоя** в одиночку: Next.js 14 App Router (RSC + SSE) · TypeScript strict · Anthropic Messages API с prompt caching · полный технический SEO + GEO под AI-поисковики.
- Каждое решение [объяснено в README](#design-decisions--почему-так): почему SSE, а не WebSocket; почему детерминированный системный промпт; почему RSC по умолчанию — это не догма, а измеримый First Load JS.
- Код — production-grade: strict TS, fail-soft API без ключа, типизированные JSON-LD генераторы, секьюрити-заголовки, чистый `tsc --noEmit`.

### Контакты

- 👤 **Обо мне:** [promaren.ru/about](https://promaren.ru/about/)
- 💼 **Кейсы / портфолио:** [promaren.ru/cases](https://promaren.ru/cases/)
- 🔗 **LinkedIn:** [linkedin.com/in/marinapogodina](https://linkedin.com/in/marinapogodina/)
- 💬 **Telegram:** [@Marinochcin](https://t.me/Marinochcin)
- 💬 **MAX:** [написать в MAX](https://max.ru/u/f9LHodD0cOJlEZP133QjIvhWolAnTSdXN2strjqN-TXqy9Pu-boUGo2WhsQ)
- ✉️ **Email:** [info@promaren.ru](mailto:info@promaren.ru)

> Открыта к разговору про **AI-engineering, automation lead, ИБ-консалтинг с AI-фокусом** и **технические тимлид-роли**. Если этот репозиторий вам интересен — напишите, расскажу про боевые кейсы под NDA.

---

## Лицензия

[MIT](./LICENSE) — используйте как шаблон или как референс, без ограничений.
