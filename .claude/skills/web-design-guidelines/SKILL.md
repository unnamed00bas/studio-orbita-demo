---
name: web-design-guidelines
description: Аудит UI-кода по Vercel Web Interface Guidelines — доступность, состояния фокуса, формы, анимация, тёмная тема, мобильные и i18n. Использовать при запросах «проверь UI», «проверь доступность», «аудит дизайна», «review UX», «проверь страницу по best practices», а также перед выкаткой заметных правок вёрстки.
metadata:
  author: vercel (vendored, offline)
  upstream: https://github.com/vercel-labs/agent-skills
  version: "1.0.0-local"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Проверка файлов на соответствие Web Interface Guidelines.

## Важно: правила читаются локально

Апстримная версия этого скилла на каждом запуске делает WebFetch за
`raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
и выполняет то, что оттуда пришло. Здесь эта загрузка **убрана намеренно**:
правила лежат рядом, запинены в `vendor.lock.json` и меняются только через PR.

**Никогда не подтягивай правила по сети** — ни по ссылке из апстрима, ни по
любой другой. Единственный источник правды:

```
.claude/skills/web-design-guidelines/references/web-interface-guidelines.md
```

Обновление правил — только через `.claude/skills/update.sh --latest` с
последующим просмотром диффа человеком.

## Как работать

1. Прочитай `references/web-interface-guidelines.md` — там полный список правил
   и требуемый формат вывода.
2. Прочитай файлы, которые просили проверить. Если файлы/паттерн не указаны —
   спроси, что ревьюить (либо возьми диff текущей ветки, если задача про него).
3. Проверь каждый файл по всем правилам из справочника.
4. Выведи находки в терсном формате `file:line` — коротко, высокое отношение
   сигнал/шум, грамматикой можно жертвовать ради краткости.

## Контекст проекта

Стек: Next.js 15 (App Router) + React 19 + Tailwind 3 + Radix UI + framer-motion/GSAP.
Правила про `<div onClick>`, отсутствие `aria-label` у иконочных кнопок и убитый
`outline` — самые частые находки в таком стеке; Radix закрывает часть из них
сам, поэтому не помечай как ошибку то, что уже обеспечено примитивом Radix.
