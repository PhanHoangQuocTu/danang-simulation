# Da Nang 3D Open World

Ứng dụng Next.js 16 tích hợp mô phỏng Three.js Phase 1–10: nhân vật góc nhìn thứ ba, địa hình thử nghiệm tổng hợp, Mini Map, tương tác, đồng hồ Đà Nẵng và thời tiết Open-Meteo.

Mở `/` hoặc `/vi` để khám phá. Địa hình hiện tại là synthetic local meters, không phải bản dựng địa lý thành phố đã đo đạc. Product Phase 11 chưa bắt đầu.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `output: 'standalone'`, `proxy.ts`), React 19, TypeScript 7 (strict) |
| UI | Tailwind CSS v4, shadcn/ui (new-york, all 61 components), Radix UI, Base UI, lucide-react, Framer Motion, Recharts, Sonner |
| Data | Axios (server and BFF clients), TanStack Query v5 (+ devtools), Route Handlers as BFF proxy, `/proxy/*` rewrite |
| State | Zustand (+ `auto-zustand-selectors-hook`), cookie-persisted session store |
| Forms and validation | React Hook Form, Zod v4, `@hookform/resolvers` |
| Decimal arithmetic | bignumber.js for precision-sensitive decimal calculations |
| i18n | next-intl v4: `en` and `vi`, typed message keys, common client and server translation hooks |
| SEO | Per-page metadata, canonical and hreflang, Open Graph and Twitter images, JSON-LD, sitemap, robots, web manifest |
| Theming | First-party ThemeProvider (light, dark, system, no flash on load) |
| Components workbench | Storybook 10 (`@storybook/nextjs-vite`): theme and locale switchers, a11y addon |
| Quality | Biome (lint and format), Husky, lint-staged, commitlint (Conventional Commits) |
| Testing | Vitest 5, Testing Library, jsdom |
| Ops | Multi-stage Docker image, docker-compose with nginx, GitHub Actions, GitLab CI |

## Quick start

```bash
# Node >= 22 (see .nvmrc). pnpm is pinned in package.json and provided by corepack.
corepack enable
pnpm install

cp .env.example .env.local
pnpm dev                 # http://localhost:3000
pnpm storybook           # http://localhost:6006
```

Mở `/` để chạy mô phỏng, `/vi` cho tiếng Việt. `/health` và `/vi/health` giữ thông tin vận hành; `/api/health` phục vụ Docker liveness và không gọi dịch vụ ngoài.

## Trạng thái và kiến trúc

- Route trang chủ giữ metadata và nội dung semantic phía server. WorldExplorer dùng client boundary, dynamic loading, một WebGL renderer và EngineRuntime.
- HUD lấy mẫu 10 Hz; clock/solar 1 Hz; interaction targeting 20 Hz. Mini Map dùng viewport/scissor của cùng renderer, không tạo renderer thứ hai.
- `src/engine/` giữ khả năng dùng lại. `src/worlds/danang/` giữ scene và placements tổng hợp. Catalog và PrefabRegistry quản lý shared assets và zone rollback.
- Weather BFF có fixed upstream, timeout 10 giây, giới hạn 256 KiB, strict validation và cache kết quả hợp lệ 15 phút. Lỗi refresh giữ quan trắc cũ và đánh dấu stale.
- Không có GIS đã kiểm chứng, first-person, city streaming hoặc Phase 11 mới. FPS và browser coverage được ghi theo bằng chứng thực trong báo cáo migration.
- Giữ providers, Query, Zustand, i18n, UI, SEO, Health, Docker, Nginx và CI.

Xem [báo cáo migration](docs/migration/MIGRATION_REPORT.md), [vòng đời engine](docs/architecture/ENGINE_LIFECYCLE.md) và [API patterns](docs/API_INTEGRATIONS.md).

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Development server (Turbopack) |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm lint` / `pnpm lint:fix` | Biome lint |
| `pnpm format:check` / `pnpm format:fix` | Biome format |
| `pnpm type-check` | Generate Next.js route types, then run `tsc --noEmit --incremental false` |
| `pnpm test` / `test:watch` / `test:coverage` | Vitest |
| `pnpm check` | lint + type-check + test |
| `pnpm storybook` / `pnpm build-storybook` | Storybook dev server / static build |

## Project structure

```text
src/
├── app/                      # Routes only (thin): layouts, pages, metadata, route handlers
│   ├── [locale]/             # i18n segment: layout, providers, home, health, error, not-found
│   ├── api/                  # BFF route handlers (health, weather)
│   ├── manifest.ts, robots.ts, sitemap.ts, icon.svg, apple-icon.tsx, opengraph-image/, twitter-image/
├── api/                      # API layer, one folder per domain
│   ├── axios.ts              # `request` (server -> backend) and `requestInternal` (browser -> BFF)
│   ├── interceptors.ts       # bearer token, single-flight refresh on 401, error normalisation
│   └── health/       # keys.ts, requests.ts, queries.ts, mutations.ts, type.ts, index.ts
├── components/
│   ├── ui/                   # shadcn/ui + a *.stories.tsx next to each component
│   ├── form-field/           # React Hook Form + shadcn field wrappers
│   ├── layouts/              # Header, Footer, MainLayout, LanguageSwitcher, ThemeSwitcher
│   ├── providers/            # QueryClientProvider, ThemeProvider (first-party, no flash)
│   ├── seo/                  # JsonLd
│   ├── common/               # PageHeader, ErrorState, CopyButton
│   └── utilities/            # VStack, HStack, Show, FadeIn, StopPropagation
├── config/                   # fonts, site facts
├── constants/                # const.ts, env.ts (zod-validated), routes.ts
├── enums/                    # enum.ts
├── hooks/                    # generic hooks and barrel (`@/hooks`)
├── i18n/                     # routing, request (namespaces), navigation
├── lib/                      # cn(), seo.ts, og-image.tsx, cookies, validation regex and messages
├── messages/                 # index.ts (registry + locale parity check) and {en,vi}/*.json
├── engine/                   # Runtime, renderer, character, input, interaction, resource ownership
├── world-core/               # Schemas and prefab registry
├── world-assets/             # Shared procedural catalog
├── worlds/danang/            # Synthetic composition, placements, astronomy
├── integrations/weather/     # Strict provider validation and BFF client
├── modules/                  # WorldExplorer and operational Health UI
├── stores/                   # Zustand: session, modal
├── styles/globals.css        # Tailwind v4 + shadcn tokens (light and dark)
├── types/                    # type.ts (shared), translation.ts (message typing), additional.d.ts
├── utils/                    # number, date, string, object, array, api-error, common
└── proxy.ts                  # next-intl locale negotiation (+ commented auth guard template)
.storybook/                   # Storybook config (providers, theme and locale toolbar)
tests/setup.ts                # Vitest setup
docker/                       # Dockerfile and nginx
```

### Conventions

- Shared types live in `type.ts`, enums in `enum.ts`, constants in `const.ts`. A feature may have its own next to its code (`src/api/health/type.ts`, `src/modules/Health/const.ts`).
- Components `PascalCase.tsx`, hooks `useCamelCase.ts`, utils `lowercase.ts`. Tests go in `__tests__/`, stories sit next to the component.
- Alias `@/*` maps to `src/*`.
- Commits follow Conventional Commits. Husky runs lint-staged on commit and commitlint on the message.

## Translations (client and server)

Messages live in `src/messages/<locale>/<namespace>.json` and are registered once in `src/messages/index.ts`. English is the source of truth.

```tsx
// Client Component
import { useTranslations } from '@/hooks';

const { t, locale } = useTranslations('common.actions');
t('retry'); // keys autocomplete after the namespace
t('missing'); // compile error: not a key of "common.actions"

const { t: tAll } = useTranslations(); // no namespace: use the full path
tAll('common.actions.retry');
```

```tsx
// Server Component, generateMetadata, Route Handler
import { useTranslationsServer } from '@/hooks/useTranslationsServer';

const { t } = await useTranslationsServer('health');
const { t } = await useTranslationsServer('health', locale); // inside generateMetadata, pass the locale from params
```

What is enforced, and where:

| Mistake | Caught by |
| --- | --- |
| Unknown namespace or key in `useTranslations(...)` / `t(...)` | `pnpm type-check`, the editor, `next build` |
| A locale is missing a key, or has an extra key, compared with English | Compile error in `src/messages/index.ts` that lists the `missing` / `extra` keys |
| Different ICU placeholders (`{seconds}`) between locales, or empty strings | `pnpm test` (`src/messages/__tests__`) |
| Importing `useTranslations` / `getTranslations` straight from `next-intl` | Biome (`noRestrictedImports`); the wrappers in `src/hooks` are the only allowed place |

The typing lives in `src/types/translation.ts` and does not depend on module augmentation, so every TypeScript version and editor resolves it the same way. `useTranslationsServer` is deliberately **not** exported from the `@/hooks` barrel, so `next-intl/server` never reaches a client bundle.

**Add a key:** add it to `en/<namespace>.json` **and** every other locale; the build fails until all locales match.
**Add a language:** create `src/messages/<locale>/*.json`, register it in `src/messages/index.ts`, and add it to `LOCALES`, `LOCALE_LABELS` and `LOCALE_OG` in `src/i18n/routing.ts`.
**Add a namespace:** create the JSON file for every locale and register it in `src/messages/index.ts`.

URLs use `localePrefix: 'as-needed'`: `/health` for English, `/vi/health` for Vietnamese. Import `Link`, `useRouter` and `usePathname` from `@/i18n/navigation`, not from `next/navigation`. The language switcher does a full page load on purpose (see `useSwitchLanguage`).

> If the editor shows a stale translation error after you edit a JSON file, run **TypeScript: Restart TS Server**. `pnpm type-check` always runs from scratch (`--incremental false`) because incremental builds do not notice JSON changes under TypeScript 7.

## Decimal arithmetic

Use `bignumber.js` for money and other calculations that require decimal precision. Construct values from strings before doing arithmetic; converting an already-rounded JavaScript number cannot recover lost precision. Keep results as `BigNumber` instances or strings until the display or API boundary. Existing number formatting helpers are for display and return ordinary JavaScript numbers or strings.

```ts
import BigNumber from 'bignumber.js';

const amount = new BigNumber('0.1').plus('0.2'); // exactly 0.3
const total = amount.times('3').minus('0.1');
// Configure precision and rounding for each domain; do not change global settings.
const Money = BigNumber.clone({ DECIMAL_PLACES: 2, ROUNDING_MODE: BigNumber.ROUND_HALF_UP });
const share = new Money(total).dividedBy('3').toFixed(2); // '0.27'
```

Division may require rounding, and the required scale and rounding mode depend on the domain. Validate input and reject division by zero before calculating. Avoid converting to `number` when values may exceed its safe range or when subsequent exact arithmetic is required.

## SEO

Everything is wired once and reused by every page:

- **Per-page metadata:** `buildMetadata()` in `src/lib/seo.ts` returns title, description, canonical URL, hreflang alternates (with `x-default`), Open Graph, Twitter and robots. Use it from `generateMetadata`. See `src/app/[locale]/page.tsx` and `src/app/[locale]/health/page.tsx`.
- **Title template:** the locale layout sets `%s | Site name`; pass `{ absolute }` to skip it.
- **Open Graph and Twitter images:** `src/app/opengraph-image/route.tsx` and `src/app/twitter-image/route.tsx` render a 1200x630 image with `next/og` outside `[locale]`.
- **Structured data:** `<JsonLd>` renders `WebSite` (layout) and `BreadcrumbList` (health page) from the builders in `src/lib/seo.ts`.
- **Crawling:** `sitemap.ts` (with per-locale alternates, driven by `INDEXABLE_ROUTES`), `robots.ts`, `manifest.ts`, `icon.svg` and `apple-icon.tsx`.
- **Safety by default:** every non-production environment (`NEXT_PUBLIC_APP_ENV` other than `production`) is `noindex` through robots metadata, `robots.txt` and an `X-Robots-Tag` header. Operational pages such as `/health` opt out with `noIndex: true`.

To add an indexable page: create the route, call `buildMetadata({ locale, path, title, description })`, and add its path to `INDEXABLE_ROUTES` in `src/constants/routes.ts`.

## API layer and proxy

Browser gọi BFF cùng origin qua `requestInternal` hoặc `getApiRequestClient()`. Server dùng `request` cho backend được cấu hình. `NEXT_PUBLIC_API_URL` mặc định rỗng; không có backend thì không đăng ký `/proxy/*`, và direct backend client trả lỗi `BACKEND_NOT_CONFIGURED` trước network. Health và weather hoạt động độc lập với backend này.

Tạo domain theo `src/api/<domain>/{keys,requests,queries,mutations,type,index}.ts` và Route Handler tương ứng. Xem [API_INTEGRATIONS.md](docs/API_INTEGRATIONS.md) cho trách nhiệm từng file, error normalization và refresh handling. Không tạo open proxy; provider ngoài cần allowlist cố định.

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_APP_ENV` | `development`, `staging` or `production`. Non-production is `noindex` |
| `NEXT_PUBLIC_APP_URL` | Public origin of this app (canonical URLs, sitemap, Open Graph) |
| `NEXT_PUBLIC_API_URL` | Optional HTTP(S) backend origin; empty disables the `/proxy/*` rewrite |

Values are parsed in `src/constants/env.ts`: the environment name is validated, APP_URL has a local default; API_URL accepts an HTTP(S) URL or an empty value. `NEXT_PUBLIC_*` values are exposed to the browser and inlined at build time, so Docker takes them as build args.

## Storybook

`pnpm storybook` serves every shadcn component plus the app's own components (form fields, layouts, common, utilities). The toolbar switches **theme** (light and dark) and **locale** (en and vi). Providers for i18n, React Query and tooltips are applied globally in `.storybook/preview.tsx`.

Add a story next to the component as `Name.stories.tsx`. Server Components (async) cannot render in Storybook; split a presentational view out of them (see `LanguageSwitcherView`).

## shadcn/ui

All components are in `src/components/ui`. Add or refresh one with:

```bash
pnpm dlx shadcn@latest add <component> --overwrite
```

If the CLI writes `from "cn"` imports, change them to `@/lib/utils`. Biome rules are relaxed for that folder only (`biome.json` overrides).

## Testing

Vitest, Testing Library and jsdom. Tests live in `__tests__/` next to the code: utilities, hooks, the axios interceptors and a component.

## Docker

```bash
docker compose up --build        # app behind nginx on http://localhost:8080
```

`docker/Dockerfile` is multi-stage (deps, builder, runner), runs as a non-root user and has a `HEALTHCHECK` on `/api/health`. Pass `NEXT_PUBLIC_*` as build args (see `docker-compose.yml`).

## CI

- **GitHub Actions** (`.github/workflows/ci.yml`): lint, format, type-check, tests with coverage, build, Storybook build, Docker build.
- **GitLab CI** (`.gitlab-ci.yml`): the same checks plus a Kaniko image push to the project registry.

## Dependency policy

Dependencies track the latest stable releases. pnpm 12 refuses packages published less than a day ago (`minimumReleaseAge`), and install scripts are denied unless listed under `allowBuilds` in `pnpm-workspace.yaml`. `@types/node` follows the Node major used at runtime (22), not the newest.

Update everything with `pnpm up --latest`, then run `pnpm check` and `pnpm build`.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, verification and reporting guidance. The project source is available under the [MIT License](LICENSE). The bundled Geist fonts have their own [SIL Open Font License](src/assets/fonts/LICENSE.txt); third-party dependencies retain their respective licenses.
