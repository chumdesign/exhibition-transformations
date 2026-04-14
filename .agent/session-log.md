# Session Log

## Template (copy for each session)
### [DATE]
- Done:
- Decisions:
- Issues:
- Next:

---

## 2026-04-13
- Done: Ініціалізація проекту, базова структура сайту, всі секції
- Decisions: Astro + Tailwind, WebP для зображень, імена файлів як метадані
- Issues: —
- Next: Контент, мобільна оптимізація

## 2026-04-14
- Done:
  - Мобільна Hero-секція (`h-auto` замість `100vh`)
  - Компактність мобільної версії (h2 -25%, відступи, фото куратора -30%)
  - Активний пункт меню з анімованим підкресленням (IntersectionObserver)
  - Видалені роботи: Мостовщикова «Я», Alex Rubanov «MUTUALISM» (EN)
  - Відновлено: Daria Most «Святковий» 55×75
  - Лайтбокс: скрол, менший хрестик, закриття по фону
  - Лайтбокс: навігація стрілками, клавіатурою ←→, свайпом на мобілці
  - Транслітерація авторів і назв для EN-версії
  - Git init + push на GitHub (`chumdesign/exhibition-transformations`)
  - Підключення GitHub до Vercel (автодеплой)
- Decisions: Транслітерація через `translitMap` — той самий підхід, що в `Participants.astro`
- Issues: Netlify вичерпав ліміти (перейшли на Vercel)
- Next: Перевірка EN-версії, міграція `rinachum` на Vercel
