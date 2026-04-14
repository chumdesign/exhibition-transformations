---
name: Finalize Session
description: Researches current chat history and updates project documentation
turbo: false
---

## Steps

1. Прочитай всю историю текущей сессии
2. Обнови файл `PROJECT.md`:
   - Добавь выполненные задачи с сегодняшней датой в раздел "Completed"
   - Обнови "Current State" — что работает прямо сейчас
   - Обнови "Known Issues & Blockers"
   - Обнови "Next Steps" — приоритизированный список
   - Добавь новые записи в "Key Decisions Log" если были архитектурные решения
   - Добавь в "Forbidden Patterns" если нашли что-то что не работает
3. Обнови `.agent/rules/project-context.md`:
   - Актуализируй стек и версии
   - Обнови "Current Priority"
   - Добавь новые критические правила если появились
4. Добавь запись в `.agent/session-log.md` с датой сегодня
5. Выведи резюме: "✅ Сессия зафиксирована. Следующий шаг: [топ-1 задача из Next Steps]"
