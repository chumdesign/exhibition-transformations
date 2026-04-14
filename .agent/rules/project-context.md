# Project Context — Auto-injected every session

## Stack
- **Astro** v6.1.5 — фреймворк (статическая генерация)
- **TypeScript** — типизация в frontmatter `.astro` файлов
- **Tailwind CSS** v4 — стилизация (inline-классы)
- **Swiper.js** — слайдер Hero и галерея Exhibition
- **Vanilla JS** — лайтбокс, IntersectionObserver (активные пункты меню)
- **Node.js** / npm — сборка
- **Vercel** — хостинг и деплой (автодеплой через GitHub)
- **GitHub** — репозиторий: `chumdesign/exhibition-transformations`

## Architecture
```
src/
  assets/images/
    artwork/      ← WebP файлы картин (имя = метаданные: Автор_Назва_Матеріал.webp)
    exhibition/   ← Фото з виставки (для каруселі)
    posters/      ← Постери (1x, 2x, WebP)
    curator.webp  ← Фото куратора
  components/
    Header.astro  ← Навігація + IntersectionObserver активного пункту
    Hero.astro    ← Swiper-слайдер з постерами
    Concept.astro ← Куратор + концепція виставки
    Artworks.astro← Masonry-галерея + Lightbox (стрілки, свайп, клавіатура)
    Participants.astro ← Список учасників з транслітерацією
    Exhibition.astro   ← Карусель фото з виставки
    Video.astro        ← Відео-секція
    Footer.astro       ← Підвал з соцмережами
  layouts/
    Layout.astro  ← Базовий layout (SEO, meta, OpenGraph)
  pages/
    index.astro   ← Українська версія (/)
    en/index.astro← Англійська версія (/en)
  styles/
    global.css    ← Глобальні стилі
```

## Critical Rules
- Завжди читай `PROJECT.md` перед початком роботи
- Не видаляй і не перезаписуй цей файл без команди `/finalize-session`
- **Зображення картин** іменуються суворо: `Автор_Назва_Матеріал, техніка, розмір.webp` — парсяться через `_` в `Artworks.astro`
- Транслітерація для EN-версії вже вбудована в `Artworks.astro` і `Participants.astro`
- Деплой автоматичний: `git push` → Vercel підхоплює і деплоїть

## Current Priority
- Перевірка коректності EN-версії (назви, авторі, матеріали)
- Можлива міграція `rinachum` проекту на Vercel
