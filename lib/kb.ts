import { products } from './content/products';
import { cases } from './content/cases';
import { guides } from './content/guides';
import { posts } from './content/blog';

export function buildKnowledgeBase(): string {
  const sections: string[] = [];

  sections.push('# О компании\n');
  sections.push(
    '«Студия Орбита» — производство сайтов, контента и AI-консультантов. Работаем по фиксированным срокам и прозрачным ценам. Не берём долгосрочные поддержки — только конкретные результаты.\n'
  );

  sections.push('# Продукты\n');
  for (const p of products) {
    sections.push(`## ${p.title}`);
    sections.push(`*${p.tagline}*`);
    sections.push(p.description);
    sections.push(`**Для кого:** ${p.audience}`);
    sections.push(`**Цена от:** ${p.priceFrom.toLocaleString('ru-RU')} ₽`);
    sections.push(`**Этапы:** ${p.steps.join(' → ')}`);
    sections.push(`**Результаты:** ${p.results.join('; ')}`);
    sections.push('');
  }

  sections.push('# Кейсы\n');
  for (const c of cases) {
    sections.push(`## ${c.title}`);
    sections.push(`*${c.client}, ${c.industry}, срок ${c.duration}*`);
    sections.push(c.summary);
    sections.push('');
  }

  sections.push('# Гайды\n');
  for (const g of guides) {
    sections.push(`## ${g.title}`);
    sections.push(g.description);
    sections.push(`Шаги: ${g.steps.map((s) => s.title).join(' → ')}`);
    sections.push('');
  }

  sections.push('# Статьи блога\n');
  for (const p of posts) {
    sections.push(`## ${p.title}`);
    sections.push(p.excerpt);
    sections.push('');
  }

  sections.push('# Контакты\n');
  sections.push('Сайт: studio-orbita.example.com');
  sections.push('Запрос на проект — через форму на странице /contacts.');

  return sections.join('\n');
}

export const SYSTEM_PROMPT = `Ты — AI-консультант компании «Студия Орбита». Отвечай на вопросы клиентов о продуктах, ценах, сроках и кейсах студии, опираясь СТРОГО на базу знаний ниже.

Правила:
- Отвечай кратко (2–4 предложения), дружелюбно, на «вы».
- Если в базе нет точного ответа — честно скажи «не знаю» и предложи оставить заявку на странице /contacts.
- Не выдумывай цены, сроки и метрики, которых нет в базе.
- Не давай юридических или налоговых консультаций.
- Если вопрос про какой-то конкретный продукт — назови его и упомяни цену «от».

База знаний:
${buildKnowledgeBase()}`;
