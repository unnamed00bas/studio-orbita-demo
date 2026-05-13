'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/products', label: 'Продукты' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/guide', label: 'Гайды' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
            ✦
          </span>
          <span>
            Студия <span className="gradient-text">Орбита</span>
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contacts"
          className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 md:inline-flex"
        >
          Обсудить проект
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 md:hidden"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-border bg-background md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <nav className="container-wide flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacts"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
          >
            Обсудить проект
          </Link>
        </nav>
      </div>
    </header>
  );
}
