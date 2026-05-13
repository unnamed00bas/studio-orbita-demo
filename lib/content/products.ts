export type Product = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  audience: string;
  steps: string[];
  results: string[];
  priceFrom: number;
  glowColor: 'blue' | 'purple' | 'orange' | 'green';
  icon: string;
};

export const products: Product[] = [
  {
    slug: 'ai-assistant',
    title: 'AI-консультант для сайта',
    shortTitle: 'AI-консультант',
    tagline: 'Отвечает клиентам 24/7 на базе ваших данных',
    description:
      'Чат-бот с потоковой генерацией ответов и базой знаний по вашим продуктам. Подключается к сайту за один скрипт, обучается на ваших материалах, передаёт горячие лиды в CRM.',
    audience: 'Малый и средний бизнес с входящими заявками с сайта',
    steps: [
      'Собираем базу знаний из ваших материалов',
      'Настраиваем тон и сценарии разговора',
      'Подключаем виджет на сайт и интеграцию с CRM',
      'Запускаем мониторинг и улучшаем ответы по логам',
    ],
    results: [
      'Конверсия в заявку выше на 18–35%',
      'Среднее время ответа — 1.2 секунды',
      'Сокращение нагрузки на менеджеров на 40%',
    ],
    priceFrom: 49000,
    glowColor: 'blue',
    icon: 'sparkles',
  },
  {
    slug: 'landing-pages',
    title: 'Лендинги и многостраничные сайты',
    shortTitle: 'Сайты',
    tagline: 'Next.js + SEO + интеграции под ключ',
    description:
      'Современные продающие сайты на Next.js с App Router. Технический SEO, структурированные данные, оптимизация под Core Web Vitals — из коробки.',
    audience: 'Бизнес, которому нужен сайт, а не «визитка»',
    steps: [
      'Прототип и структура (карта типов страниц, воронка)',
      'Дизайн в фирменной палитре, адаптив',
      'Разработка на Next.js, TypeScript, Tailwind',
      'Развёртывание, метрики, аналитика',
    ],
    results: [
      'PageSpeed 90+ на mobile',
      'Структурированные данные для AI-поисковиков',
      'Time-to-first-byte < 400 мс',
    ],
    priceFrom: 120000,
    glowColor: 'blue',
    icon: 'layout-dashboard',
  },
  {
    slug: 'content-factory',
    title: 'Контент-завод',
    shortTitle: 'Контент',
    tagline: 'Поток SEO-статей, гайдов, рассылок на потоке',
    description:
      'Производство контента по плану: статьи в блог с разметкой Article, лонгриды-гайды HowTo, посты в соцсети. Каждая единица проходит ручную редактуру.',
    audience: 'Компании, которым нужен поток контента без расширения штата',
    steps: [
      'Семантическое ядро и контент-план на 3 месяца',
      'Производство и редактура',
      'Публикация и разметка',
      'Отчёт по позициям и трафику',
    ],
    results: [
      '8–12 статей в месяц',
      'Рост органического трафика на 40–80% за квартал',
      'Попадание в выдачу AI-поисковиков',
    ],
    priceFrom: 65000,
    glowColor: 'blue',
    icon: 'feather',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
