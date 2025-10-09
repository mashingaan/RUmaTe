# RUmaTe

Полностью рабочий прототип мобильного приложения для подбора соседей и комнат студентов.

## Стек

- **Expo React Native (SDK 54)** — мобильный фронтенд (TypeScript, Expo Router, React Navigation)
- **NativeWind + Tailwind** — дизайн-система и темизация
- **Zustand + TanStack Query** — состояние и загрузка данных
- **Supabase** — Postgres, Auth, Storage, Realtime
- **Jest + Testing Library** — юнит и UI-тесты
- **GitHub Actions + EAS** — CI/CD, предпросмотр сборок

## Быстрый старт

```bash
npm install
npx supabase start    # локальный Supabase или настройте переменные окружения
npx expo start
```

> [!NOTE]
> В репозитории сохранены текстовые конфигурации без бинарных ассетов иконок/сплэша. Перед публикацией добавьте собственные изображения (1024×1024 для иконки, адаптивные и сплэш) и пропишите пути в `app.json`.

### Переменные окружения

Создайте файл `.env` или используйте `app.config` и задайте:

```
EXPO_PUBLIC_SUPABASE_URL=... 
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

## Структура проекта

```
app/                # expo-router маршруты (прокси в src/app)
src/
  app/              # экраны
    (tabs)/         # вкладки Home / Matches / Messages
    publish/        # мастер публикации комнаты (3 шага)
  components/       # UI-кит (Button, Chip, ListingCard, Skeleton и т.д.)
  hooks/            # хуки данных и платформенных событий
  lib/              # Supabase клиент, Zod-схемы, совместимость
  store/            # Zustand сторы (онбординг, фильтры, публикация)
  utils/            # вспомогательные функции (загрузка фото)
  constants/        # токены темы
supabase/
  migrations/       # SQL миграции + RLS политики
.github/workflows/  # GitHub Actions CI
```

## Supabase

1. Запустите локальный Supabase или подключите облачный проект.
2. Выполните миграции:

```bash
npx supabase migration up
```

Созданные миграции включают:

- Таблицы `profiles`, `preferences`, `listings`, `matches`, `threads`, `messages`, `verifications` и др.
- View `listings_view` с агрегированными изображениями
- Политики RLS: пользователи видят только активные объявления, свои чаты, могут править собственные данные

## Основные экраны

- **Onboarding** — до 3 шагов (кампус, бюджет, дата въезда)
- **Home** — лента карточек, чип-фильтры, мини-карта, FAB для публикации
- **Matches** — рекомендации по совместимости, чипы предпочтений профиля
- **Messages** — real-time чат, быстрые ответы, статусы
- **Publish** — мастер публикации (детали → фото → условия) с превью карточки
- **Profile / Settings** — управление профилем, верификация, выход/деактивация

## Тесты и качество

```bash
npm run lint       # ESLint + Prettier
npm run typecheck  # TypeScript strict mode
npm test           # Jest + Testing Library
```

CI (GitHub Actions) автоматически запускает линтер, тайпчек, тесты и EAS build preview для PR.

## Хранилище и realtime

- **Storage**: bucket `listing-images` для фотографий объявлений
- **Realtime**: каналы Supabase для чатов и потоковых обновлений
- **AsyncStorage**: кеш последнего поиска, черновик публикации, онбординг

## Дальнейшие шаги

- Подключить фирменный домен Supabase и включить email-OTP
- Настроить пуш-уведомления для новых сообщений и матчей
- Реализовать серверный расчёт `compatibility_index` в edge-функции

Готово к запуску: достаточно прописать ключи Supabase и запустить Expo.
