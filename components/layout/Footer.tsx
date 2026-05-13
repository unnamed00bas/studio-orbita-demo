import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
              ✦
            </span>
            <span>Студия Орбита</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Сайты, контент и AI-консультанты на потоке. По фиксированным срокам.
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold">Продукты</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/products/ai-assistant" className="hover:text-foreground">AI-консультант</Link></li>
            <li><Link href="/products" className="hover:text-foreground">Сайты на Next.js</Link></li>
            <li><Link href="/products" className="hover:text-foreground">Контент-завод</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold">Студия</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/cases" className="hover:text-foreground">Кейсы</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Блог</Link></li>
            <li><Link href="/guide" className="hover:text-foreground">Гайды</Link></li>
            <li><Link href="/contacts" className="hover:text-foreground">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold">Демо-проект</div>
          <p className="text-sm text-muted-foreground">
            Этот сайт — учебный демо-проект, опубликованный с открытым исходным кодом.
            Все цены, кейсы и контакты — условные.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-wide flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {year} Студия Орбита (demo). MIT License.</div>
          <div>Made with Next.js 14 · TypeScript · Tailwind CSS</div>
        </div>
      </div>
    </footer>
  );
}
