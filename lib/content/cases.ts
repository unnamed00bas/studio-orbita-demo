export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  summary: string;
  challenge: string;
  solution: string[];
  metrics: { label: string; value: string; delta?: string }[];
  stack: string[];
  publishedAt: string;
};

export const cases: CaseStudy[] = [
  {
    slug: 'orbita-launch',
    title: 'Запуск AI-консультанта для онлайн-школы за 14 дней',
    client: 'Онлайн-школа дизайна (условный кейс)',
    industry: 'EdTech',
    duration: '14 дней',
    summary:
      'Заменили чат с менеджерами на AI-консультанта с базой знаний по курсам. Время первого ответа упало с 12 минут до 1.2 секунды, конверсия лендинга выросла на 27%.',
    challenge:
      'У школы был чат с живыми менеджерами, но они физически не успевали отвечать на все вопросы — пиковая нагрузка приходилась на вечер, когда люди возвращались с работы. До 40% обращений терялось, потому что человек не дожидался ответа и закрывал вкладку.',
    solution: [
      'Собрали базу знаний из 28 страниц сайта, FAQ и внутренних регламентов',
      'Спроектировали 4 сценария разговора: новый клиент, повтор, рассрочка, отказ',
      'Реализовали потоковую генерацию — пользователь видит ответ через 1.2 секунды',
      'Подключили передачу горячих лидов на менеджеров с контекстом всего диалога',
      'Настроили дашборд с метриками: какие вопросы задают, где AI не справился',
    ],
    metrics: [
      { label: 'Конверсия в заявку', value: '5.4%', delta: '+27%' },
      { label: 'Время первого ответа', value: '1.2 сек', delta: '−99%' },
      { label: 'Доля автоматических ответов', value: '78%' },
      { label: 'Потерянных обращений', value: '6%', delta: '−85%' },
    ],
    stack: [
      'Next.js 14 App Router',
      'TypeScript',
      'Anthropic Messages API (streaming)',
      'Server-Sent Events',
      'Tailwind CSS',
    ],
    publishedAt: '2026-03-15',
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
