export const SITE = {
  name: 'Студия Орбита',
  shortName: 'Орбита',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://studio-orbita.example.com',
  description:
    'Производство сайтов, контента и AI-консультантов на потоке. Кейсы, гайды, прозрачные цены.',
  locale: 'ru_RU',
  twitter: '@studio_orbita',
};

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

type OrganizationLD = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  description: string;
  logo: string;
  sameAs?: string[];
};

export function organizationLd(): OrganizationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: absoluteUrl('/icon.svg'),
  };
}

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

type ArticleLDInput = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
};

export function articleLd(input: ArticleLDInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.url),
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { '@type': 'Organization', name: input.author || SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.svg') },
    },
  };
}

type ProductLDInput = {
  name: string;
  description: string;
  url: string;
  priceFrom: number;
  currency?: string;
};

export function productLd(input: ProductLDInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: input.currency || 'RUB',
      lowPrice: input.priceFrom,
      offerCount: 1,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(input.url),
    },
  };
}

type FaqItem = { question: string; answer: string };

export function faqLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

type HowToStep = { name: string; text: string };

export function howToLd(name: string, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
