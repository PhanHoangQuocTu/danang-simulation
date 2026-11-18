# Style ownership

`src/styles/globals.css` là Tailwind v4/animation entry và base layer, import từ root layout.
`tokens.css` sở hữu shadcn light/dark semantic values và `@theme inline` mapping.
Tách nguyên declarations, không đổi color/radius/theme defaults của Health.

`src/styles/world-explorer.css` thay `src/modules/WorldExplorer/styles/world.css`.
Nó import `world-tokens.css`, chứa nguyên scoped dark world tokens và reduced-motion values.
Hai consumer là WorldExplorerClient và HUD stories; imagery story dùng cùng entry.
Không để compatibility copy ở đường dẫn cũ.

World tokens có chủ ý nằm dưới `.world-explorer`. Các primitives `ds-*` được scope;
HUD selectors dùng namespace `world-*`. Chúng không đổi base selectors của Health.
Next có thể giữ stylesheet sau SPA navigation, vì vậy scope quan trọng hơn vị trí file.
World palette/font/radii là domain UI riêng, không gộp vào token shadcn làm đổi boilerplate.
Không tạo utilities stylesheet khi chưa có cross-feature consumer.

Touch: guide chuyển cùng DOM column với Mini Map/toolbar/panels. Cột có viewport budget,
cuộn dọc và overscroll containment; guide không còn fixed anchor đè toolbar.
Desktop: guide giữ fixed lower-left để bảo toàn composition. Interactive controls có
native focus/scroll behavior; debug expanded vẫn bounded và scrollable riêng.
Không ẩn controls để đạt hit-test. Sáu viewport phải kiểm từng target sau scroll-to-nearest.

Tokens được di chuyển giữ nguyên values, không phải tuyên bố hoàn thành accessibility audit.
Chữ HUD nhỏ và physical safe-area/high-zoom usability vẫn cần kiểm thiết bị thật.
