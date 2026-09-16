# CLAUDE.md — studio-orbita-demo

Памятка для Claude Code по этому проекту. Общие правила — в `_ops/CLAUDE.md` пульта.

## Текстовые модели KIE

Через ключ KIE доступны не только картинки, но и текстовые модели: Gemini, Claude,
GPT, Codex, Grok. **Актуальный список моделей и адресов — https://docs.kie.ai/llms.txt**,
раздел «Chat Models». Сюда список не переписывается: он устаревает за неделю.
Запись заведена по задаче [PRO-852](https://linear.app/promaren/issue/PRO-852/vo-vseh-proektah-zapisat-tekstovye-modeli-kie-kak-vyzyvat-i-gde).

- **Ключ `KIE_AI_API_KEY`** — в этом проекте его нет: ни в `.env*`, ни в коде. Понадобится — завести переменную в `.env`, а в образец окружения положить только имя. Значение только в `.env`, никогда в чат, журнал или коммит.
- **Утверждённые владельцем модели:** текст — Gemini 3.8 Flash (`gemini-3-8-flash`),
  обложки — GPT Image 2.5 Flare (`gpt-image-2-5-flare-text-to-image`, размер `1K`).
  Сменить модель в проекте — решение владельца, не своё.
- **Как вызывать (формат OpenAI):** `POST https://api.kie.ai/<модель>-openai/v1/chat/completions`,
  заголовок `Authorization: Bearer <ключ>`, в теле `messages`, `stream: false`,
  `reasoning_effort: low|high`. Имя модели берётся из адреса в llms.txt.
- **Ловушки (проверено живыми запросами 16.09.2026):** отказ приходит с HTTP 200, а
  настоящий код лежит в теле (`{"code":401,…}`, `{"code":422,"msg":"The model is not supported"}`) —
  проверять тело, а не только статус; без `stream: false` приходит поток событий, а не JSON;
  `max_tokens` принимается и не соблюдается; цена — в поле ответа `credits_consumed`.
- **Размышление `high`** дорого временем: большая правка думает 3–4 минуты, и шлюз KIE
  обрывает её кодом 524 со страницей HTML вместо JSON. Правки и всё без сочинительства —
  с `low` (та же цена, секунды). Поток не спасает: заголовки приходят после размышления,
  а `finish_reason` в потоке не приходит вовсе.
- **Образец клиента** с тестами на все ловушки — `promaren-landing/lib/blog/kie-tekst.mjs`.
- **Claude через KIE** 06.09.2026 отвечал примерно в 4% случаев
  ([PRO-114](https://linear.app/promaren/issue/PRO-114/claude-na-kie-otklonyon-dostupnost-okolo-4percent)) —
  прежде чем на него опираться, проверить заново.
