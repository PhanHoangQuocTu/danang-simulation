# Configuration ownership

| Domain | Single owner | Boundary |
|---|---|---|
| Site/SEO | `src/config/site.ts` | Site facts, không chứa world physics |
| Font loading | `src/config/fonts.ts` | Next font setup |
| Environment | `src/constants/env.ts` | Ba biến hiện hữu, Zod boundary |
| Generic physics/camera/Mini Map | `src/engine/core/const.ts` | Engine defaults, không city imports |
| Raster resource/numeric safety | `src/engine/imagery/const.ts` | Pure domain limits; không app config dependency |
| GCP acceptance thresholds | Validated imagery asset record | Dataset-specific; không global survey threshold |
| Da Nang location/solar | `src/worlds/danang/const.ts` | City-only composition |
| Geo reference/confidence | `src/worlds/danang/georeference.ts` | Phase 12 immutable reference, unchanged |
| Source rights/catalog | `src/worlds/danang/data-sources.ts` + Phase 13 registry | Một catalog, imagery adapter đọc chung |
| Weather network | `src/integrations/weather/*` + fixed `/api/weather` | Không imagery/provider credentials |
| Global/world style | `src/styles/{tokens,world-tokens}.css` | App vs scoped world domains |

Không phát hiện duplicate config cần gộp trong các owner bị tác động. Không chuyển tất cả
vào config.ts hoặc tạo barrels xuyên server/client. New raster limits thuộc pure engine
vì cả validator, trust adapter và browser loader cần dùng cùng resource budget.
Giữ engine → geospatial/imagery, world-core → engine; UI → world-core/city.
Không có import ngược từ engine/world-core vào React/Next/city.
Không thêm env variable, backend, token, provider URL fetch hoặc secret.

Rollback bằng diff theo nhóm input, imagery và style; không có persisted-data migration.
Security dependency patches cần đi cùng package.json/pnpm-lock.yaml. Không tự downgrade
bản vá chỉ để tái tạo baseline dễ hơn.
