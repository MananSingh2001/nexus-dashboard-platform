# 🚀 Nexus Dashboard Platform

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Node](https://img.shields.io/badge/node-%3E=18-blue)
![Java](https://img.shields.io/badge/java-17+-orange)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

Enterprise-grade Micro-Frontend orchestration platform — widgets are registered in a PostgreSQL registry, fetched at runtime by the Shell UI, and injected dynamically with zero host rebuilds. New products ship without touching the core platform.


🧠 The Problem This Solves
In traditional monolithic frontends, adding a new dashboard widget means modifying the host app, rebuilding, and redeploying the entire platform — even when the change is isolated to one team's feature.
Nexus Dashboard Platform decouples this entirely:

Teams build and deploy widgets independently
The Shell UI fetches the active widget registry from the backend at runtime
New widgets are live the moment they're registered — zero redeployments of the host shell
RBAC controls which roles see which widgets, enforced at both the API and UI layer

This is the same pattern used at enterprise scale by companies like Spotify (squad model), DAZN, and Zalando.

🏗️ System Architecture
┌─────────────────────────────────────────────────────────────┐
│                     Nexus UI Engine                         │
│              (Next.js 15 Shell — port 3000)                 │
│                                                             │
│   ┌─────────────────┐      ┌──────────────────────────┐    │
│   │  Widget Loader  │─────▶│  Remote Widget Bundle    │    │
│   │   (Runtime DI)  │      │  (my-first-widget/dist)  │    │
│   └────────┬────────┘      └──────────────────────────┘    │
│            │ fetch registry                                  │
└────────────┼────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────┐
│   Registry Backend (Spring     │
│   Boot 3 / Java 17 — port 8080)│
│                                │
│   GET  /api/widgets            │
│   POST /api/widgets            │
│   DELETE /api/widgets/:id      │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│   PostgreSQL 15                │
│   DB: nexus_registry           │
│   (Widget metadata + RBAC)     │
└────────────────────────────────┘
Request flow:

Shell UI boots → calls GET /api/widgets with user role header
Spring Boot queries nexus_registry DB → returns permitted widget manifests (name, bundle URL, mount point, roles)
Widget Loader dynamically fetches the remote JS bundle at the URL in the manifest
Bundle is injected into the shell at the registered mount point — no rebuild, no restart
New widget goes live by calling POST /api/widgets alone


✨ Key Engineering Decisions
🔌 Runtime Widget Injection (not build-time)
The Widget Loader uses dynamic import() + fetch() to pull remote bundles at runtime. This is not a webpack alias — the host shell has zero compile-time knowledge of what widgets exist. Bundles are discovered entirely from the registry response, enabling true host-module decoupling across squads.
🧠 Registry-Driven UI Composition
Widget metadata (bundle URL, mount point, display name, required role, order) lives in PostgreSQL — not in any config file or env variable. This means the UI composition layer is database-driven and programmable. An admin can hot-swap a widget's bundle URL or reorder the dashboard without any code changes.
🔐 RBAC at the API boundary
The registry endpoint filters widgets by the caller's role before returning manifests. The Shell UI never receives widget configs the user isn't permitted to see — there's no client-side filtering that can be bypassed.
🐳 Full Containerization
All three services (PostgreSQL, Spring Boot backend, Next.js frontend) are orchestrated via Docker Compose with a named volume for DB persistence. Individual Dockerfiles (Dockerfile.frontend, Dockerfile.backend, Dockerfile.widget) allow independent image builds per service.

🛠️ Tech Stack
LayerTechnologyShell UINext.js 15, TypeScript, Tailwind CSS, Redux ToolkitWidget SDKVite, TypeScript, ReactRegistry APIJava 17, Spring Boot 3, MavenDatabasePostgreSQL 15ContainerizationDocker, Docker ComposeCI/CDGitHub Actions

📁 Project Structure
nexus-dashboard-platform/
│
├── nexus-ui-engine/          # Shell application (Next.js 15)
│   └── src/
│       ├── components/       # Widget Loader engine, layout shell
│       ├── store/            # Redux Toolkit — widget registry state
│       └── app/              # Next.js App Router pages
│
├── my-first-widget/          # Example widget (Vite + React)
│   └── src/                  # Self-contained widget bundle
│
├── demo/                     # Spring Boot 3 registry backend
│   └── src/main/java/
│       └── ...               # Widget entity, REST controller, JPA repo
│
├── Dockerfile.frontend       # Next.js image
├── Dockerfile.backend        # Spring Boot image
├── Dockerfile.widget         # Widget builder image
├── docker-compose.yml        # Full platform orchestration
├── API.md                    # Registry API reference
└── CONTRIBUTING.md

🚦 Getting Started
Prerequisites

Docker & Docker Compose (recommended — spins up everything in one command)
Or: Node.js 18+, Java 17+, PostgreSQL 15 (for manual setup)

Option A — Docker Compose (Recommended)
bashgit clone https://github.com/MananSingh2001/nexus-dashboard-platform.git
cd nexus-dashboard-platform

docker-compose up --build
ServiceURLShell UIhttp://localhost:3000Registry APIhttp://localhost:8080/api/widgetsPostgreSQLlocalhost:5432 (DB: nexus_registry)
Option B — Manual Setup
1. Start the Registry Backend
bashcd demo
mvn spring-boot:run
# Starts Spring Boot on :8080
# Auto-creates DB schema on first boot (Spring Data JPA)
2. Build a Widget
bashcd my-first-widget
npm install
npm run build
# Outputs bundle to dist/ — serve this or register its URL in the registry
3. Start the Shell UI
bashcd nexus-ui-engine
npm install
npm run dev
# Starts Next.js on :3000

📡 Registry API Reference
Full docs: API.md
Base URL: http://localhost:8080/api
MethodEndpointDescriptionGET/widgetsReturns all registered widget manifestsPOST/widgetsRegister a new widgetDELETE/widgets/{id}Remove a widget from the registry
Example — register a widget:
bashcurl -X POST http://localhost:8080/api/widgets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Revenue Chart",
    "bundleUrl": "http://localhost:5173/my-first-widget.js",
    "mountPoint": "#widget-revenue",
    "requiredRole": "ADMIN",
    "order": 1
  }'
Example — fetch the registry (Shell UI does this on boot):
bashcurl http://localhost:8080/api/widgets
# Returns JSON array of permitted widget manifests

🐳 Docker Compose Services
yamlservices:
  postgres:     # PostgreSQL 15, DB: nexus_registry, port 5432
  backend:      # Spring Boot 3, port 8080, depends on postgres
  frontend:     # Next.js 15, port 3000, depends on backend
All services are networked internally. Backend connects to Postgres via SPRING_DATASOURCE_URL. DB data persists in the pgdata named volume across restarts.

🔮 Extension Points
The platform is designed to be extended without modifying the core shell:

Add a new widget — build with Vite, host the bundle anywhere (S3, CDN, localhost), call POST /api/widgets with its URL. Done.
Add a new role — extend the requiredRole field in the widget manifest; the Widget Loader respects it automatically.
LLM-generated dashboards — the Registry-Driven architecture means an AI agent can call POST /api/widgets to compose a dashboard from natural language — no human in the loop needed for layout changes.


🤝 Contributing
See CONTRIBUTING.md. All PRs welcome — especially new widget implementations or Widget Loader enhancements.

👤 Author
Manan Singh — Senior Software Engineer I @ HCLSoftware
LinkedIn · GitHub · npm

📄 License
MIT License © Manan Singh
