import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-tight flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-6xl font-bold gradient-text">404</div>
      <h1 className="mb-3 text-2xl font-bold">Страница не найдена</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Возможно, страница была перемещена или вы перешли по устаревшей ссылке.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        На главную
      </Link>
    </section>
  );
}
