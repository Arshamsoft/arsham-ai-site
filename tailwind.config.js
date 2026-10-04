/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Vazirmatn Variable"', 'Vazirmatn', 'Tahoma', 'system-ui', 'sans-serif'],
        display: ['"Kufi Display"', '"Vazirmatn Variable"', 'Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      // رنگ‌ها از متغیرهای CSS در src/index.css میان تا تم روشن/تیره با یک کلاس عوض بشه
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        fg: 'rgb(var(--c-fg) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        lapis: 'rgb(var(--c-lapis) / <alpha-value>)',
        turq: 'rgb(var(--c-turq) / <alpha-value>)',
        saffron: 'rgb(var(--c-saffron) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
