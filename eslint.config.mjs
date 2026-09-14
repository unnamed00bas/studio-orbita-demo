import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/**
 * Конфигурация ESLint 9 (плоский формат) для демо-проекта.
 *
 * Набор правил тот же, что был в `.eslintrc.json`: `next/core-web-vitals`.
 * Формат сменился потому, что `eslint-config-next` 16 требует ESLint 9, а он
 * `.eslintrc` больше не читает.
 *
 * Пресет уже плоский — экспортирует готовый массив, — поэтому `FlatCompat`
 * здесь не нужен: обёртка вокруг плоского пресета падает с «Converting
 * circular structure to JSON».
 */
export default [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  ...nextCoreWebVitals,
];
