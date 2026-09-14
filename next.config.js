/** @type {import('next').NextConfig} */
const nextConfig = {
  // Корень проекта задан явно. Next 16 ищет его сам — по ближайшему
  // package-lock.json вверх по дереву, — и в монорепозитории поднимается выше
  // этого каталога: сборка начинала тянуть файлы соседнего проекта и падала на
  // чужих импортах. В отдельно опубликованном репозитории значение то же самое,
  // поэтому строка не мешает и там.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
