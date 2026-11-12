# Kế hoạch benchmark

NOT RUN. Target không phải kết quả: desktop 55–60 FPS, mobile ít nhất 30 FPS.

Giữ scene synthetic Phase 10, seed geometry cố định khi đo. Ghi CPU/GPU/OS/browser/driver, backend, Three version, DPR, resolution, quality, network, scene hash. Warm-up 30s, sample 120s, 3 runs; báo median/p95 frame time, draw calls, triangles, geometry/texture counts, JS heap và GPU time nếu timer query khả dụng. Không quy JS heap thành VRAM.

Scenarios: đứng yên; di chuyển/jump/sprint; minimap static/follow; weather effects bằng fixture ghi rõ synthetic; resize/context loss; 20 vòng mount/unmount; zones load/cancel/unload; WebGPU fallback; licensed 3D Tiles fixture với giới hạn cache. Network weather được mock có nhãn test; không thêm controls giả vào sản phẩm.

So sánh WebGL/WebGPU cùng resolution và scene complexity; shader phải tương đương trước so sánh. Đo transferred/gzip bundle riêng. Chỉ chấp nhận renderer mới khi không regression Phase diagnostics, controls, minimap và cleanup. Mobile/integrated/discrete GPU cần thiết bị thật. Software rendering chỉ chứng minh lifecycle, không đại diện FPS production.
