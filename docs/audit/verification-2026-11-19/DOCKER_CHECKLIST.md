# Docker verification checklist

This VM has no Docker at all (`docker: command not found`), and the
Windows QA machine had a Docker client (28.3.2) but no reachable daemon
— so Docker runtime is NOT VERIFIED. Run this on a host with a working
Docker daemon.

## 1. Host

- Record `docker version` (client AND server), host OS, image digest.
- Fix the daemon first; re-proving the client proves nothing.

## 2. Build and boot

- `docker compose build && docker compose up -d`
- `curl http://localhost:8080/api/health` (compose healthcheck, nginx path)
- `curl http://localhost:8080/` returns 200.

## 3. FPS against the container

- Run `fps-probe.mjs` against `http://localhost:8080` (nginx path).
  This certifies the deployment path, not rendering performance —
  Docker adds no GPU; container FPS runs still need a host GPU or a
  real device. Record `docker stats` (CPU/mem) during the soak run.

## 4. CI

- Extend `.github/workflows/ci.yml` `docker` job (currently build-only,
  `push: false`) with a smoke step that boots the image and hits
  `/api/health`. No GPU is needed for that step.
