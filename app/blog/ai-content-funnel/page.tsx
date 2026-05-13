import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Clock } from 'lucide-react';
import { getPost } from '@/lib/content/blog';
import { articleLd, breadcrumbLd } from '@/lib/seo';

const post = getPost('ai-content-funnel');

export const metadata: Metadata = post
  ? {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: { type: 'article', title: post.title, description: post.excerpt },
    }
  : {};

export default function BlogPostPage() {
  if (!post) return notFound();

  const ld = [
    breadcrumbLd([
      { name: 'Главная', url: '/' },
      { name: 'Блог', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
    articleLd({
      headline: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      datePublished: post.publishedAt,
    }),
  ];

  return (
    <>
      {ld.map((obj, i) => (
        <Script
          key={i}
          id={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <article className="py-16 sm:py-20">
        <div className="container-tight">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-foreground">Блог</Link>
            <span className="mx-2">/</span>
            <span>Статья</span>
          </nav>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border px-2 py-0.5">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-balance text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </header>

          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'p')
                return (
                  <p key={i} className="text-balance text-lg leading-relaxed">
                    {block.text}
                  </p>
                );
              if (block.type === 'h2')
                return (
                  <h2 key={i} className="mt-8 text-2xl font-bold tracking-tight">
                    {block.text}
                  </h2>
                );
              if (block.type === 'h3')
                return (
                  <h3 key={i} className="mt-6 text-xl font-bold">
                    {block.text}
                  </h3>
                );
              if (block.type === 'ul')
                return (
                  <ul key={i} className="space-y-2">
                    {block.items?.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              if (block.type === 'quote')
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-primary bg-primary/5 py-4 pl-6 text-balance text-lg italic"
                  >
                    {block.text}
                  </blockquote>
                );
              return null;
            })}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
            <h3 className="text-xl font-bold">Нужна помощь с GEO-аудитом?</h3>
            <p className="mt-2 text-muted-foreground">
              Проведём аудит вашего сайта и подскажем, что мешает попадать в
              AI-выдачу.
            </p>
            <Link
              href="/contacts"
              className="mt-4 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
