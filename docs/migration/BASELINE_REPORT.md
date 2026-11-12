# Báo cáo baseline — 2026-11-12

## Phạm vi và bảo toàn

Nguồn chuẩn: `docs/prompts/DA_NANG_3D_OPEN_WORLD_MASTER_IMPLEMENTATION.md` (3.205 dòng), handover (149 dòng), TSX Phase 10 (8.513 dòng). Branch `main`, commit `c22c478`. Ban đầu chỉ `docs/` và `history/` untracked; không xóa hoặc định dạng lại nguồn người dùng.

SHA-256 TSX: `418734fb71ae5026980c400450abc0b6ea6dda03c23adcfc8392cc1b7a0bf566`.
SHA-256 handover: `242527dfc1215c13f14378f72f19713d8aff1e8997a2cbfad67811e16bf61b42`.

## Kiến trúc hiện có

Next 16.4.2, React 19.3.1, TypeScript 7.0.2; pnpm 12.14.0. Host Node 26.13.0 khác runtime mục tiêu Node 22. Đã cài dependencies từ lockfile; không nâng cấp boilerplate. Three.js chưa có trước migration.
Routes: `/`, `/health`, locale `vi`; `/api/health`, `/api/posts`, `/api/posts/[id]`. Health trả status, timestamp, uptime, version, environment; `no-store`, không gọi upstream. Dockerfile và Compose probe cố định `/api/health`. Nginx proxy frontend; CI chạy lint/format/types/tests/build/Storybook. Locale proxy độc lập BFF. Providers, SEO, Zustand, TanStack Query, typed translations được giữ nguyên.

## Baseline thực chạy trước thay đổi source

| Check | Kết quả | Bằng chứng |
|---|---|---|
| Install frozen | PASS | 566 packages; elevated sandbox cho pnpm store |
| Lint | FAIL | 255 errors, 17 warnings; archived TSX |
| Format | FAIL | archived TSX không theo Biome |
| Types | FAIL | history TSX thiếu three và sai attr `description` trong upsertMeta |
| Unit | PASS | 16 files, 56 tests, 2.54s |
| Build | FAIL | compile 3.6s; type errors trong history |
| Storybook | PASS | build thành công; xem cảnh báo trong evidence |
| Browser | NOT RUN | Python Playwright chưa cài; không có browser MCP |
| DIAG-01–09 | NOT RUN | 9/9 là báo cáo lịch sử, chưa phải bằng chứng phiên này |
| Geographic/performance | NOT RUN | chưa có dataset/benchmark |

Log gốc ở `/tmp/danang-baseline-*.log` trong phiên này. Sandbox thường chặn pnpm store/native binding và network interfaces; elevated checks phân biệt lỗi môi trường với lỗi source.

## Rủi ro migration

Prototype dùng global CSS `:root`, client SEO ghi đè robots; weather sanitizer sinh defaults; diagnostics không dispose test geometry/material; collision tạo mảng mỗi frame; mini map lỗi có thể bị ghi đè ready; dialog không khóa toàn bộ controller. Giữ nguồn lịch sử nguyên vẹn; xử lý trong bản tách khi có regression tests.

## Hướng sửa baseline

Loại `history/` khỏi TypeScript và Biome: đây là tài liệu nguồn, không thuộc application graph. Không nới rules source; không sửa compiler options Next yêu cầu. Rollback: gỡ hai exclusions. Mọi code migration trong `src/` vẫn chịu đầy đủ checks.

## Tool audit

CodeGraph MCP gọi thành công, có source và caller graph. Context7 resolve/query Three.js thành công. Web đọc docs chính thức Three.js, NASA-AMMOS, Cesium, MapLibre, OSM, glTF Transform. Skills migration, investigate-first, webapp-testing đã đọc và áp dụng; caveman chỉ cho chat. Không có GIS skill chuyên dụng trong catalog hiện tại. `.agents/`, `.codex/` trống; `.claude/agents/search.md` là Claude subagent read-only, không được khởi chạy. `CLAUDE.md` import AGENTS. Không tìm thấy GEMINI.md hoặc workspace Antigravity rules. VS Code đề xuất Tailwind, pretty-ts-errors, Biome; không xác nhận trạng thái extension đã cài. Không cài plugin/global tool; MCP hiện có đủ cho research/code analysis. GitHub connector chưa cần vì không push/PR.

## Tiếp tục theo specification

M0 audit, M1 sửa gate; M2 research; M3 architecture; M4 mapping; M5 foundation; M6 migration theo nhóm có test. Không nhầm milestone 11 tooling với product Phase 11; product Phase 11 chưa được phép.
