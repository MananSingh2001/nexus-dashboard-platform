Nexus Dashboard Platform
An enterprise-grade Micro-frontend (MFE) Orchestration platform. This project demonstrates a decoupled architecture where a dynamic UI is driven entirely by a backend registry.

🚀 Architecture Overview
The system follows the BFF (Backend for Frontend) pattern to manage a pluggable widget ecosystem:

Shell (Next.js): A high-performance host application that dynamically injects remote JavaScript bundles into the DOM based on registry metadata.

Registry BFF (Spring Boot): A RESTful service that manages widget configurations, entitlements, and asset locations.

Database (PostgreSQL): The single source of truth for dashboard layouts, styling tokens, and role-based access control.

Widget Library (React + Vite): Standalone, independently deployable UI components registered to a global library.

✨ Key Features
Dynamic Asset Loading: Implemented a custom WidgetLoader using React hooks to manage asynchronous script injection and mounting.

Registry-Driven Theming: Widget appearance (gradients, titles, and modes) is orchestrated via JSON configuration schemas in PostgreSQL.

Modular Scaling: New features can be deployed and added to the dashboard via database entries without requiring a rebuild of the shell application.

Redux State Orchestration: Global state management for synchronized data fetching across the micro-frontend ecosystem.

🛠️ Tech Stack
Frontend: Next.js 15, TypeScript, Tailwind CSS, Redux Toolkit.

Backend: Java 17, Spring Boot 3, Spring Data JPA.

Database: PostgreSQL.

Tooling: Vite, Git, Maven, NPM.

📖 How it Works
The Shell requests the active widget list from the Spring Boot BFF.

The BFF queries the PostgreSQL Registry for widget metadata and entry-point URLs.

The Shell injects the required script bundles into the document head.

The WidgetLoader resolves the component from the global NexusWidgets library and renders it with the database-provided configuration.




🚀 Quick Start Guide
1. Prerequisites
Java 17+ and Maven

Node.js 18+

PostgreSQL running locally

2. Database Setup
Create a database named nexus_registry and run the following to seed your dashboard:

SQL
CREATE TABLE widgets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    entry_point_url TEXT,
    required_role VARCHAR(50),
    config_schema TEXT
);

INSERT INTO widgets (name, entry_point_url, required_role, config_schema)
VALUES ('Sales-Widget', 'http://localhost:3000/widget.js', 'ADMIN', '{"title": "Q1 Performance", "color": "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)"}');
3. Run the Platform
Open three terminals in the root directory:

Terminal 1: Spring Boot BFF

Bash
cd demo
mvn spring-boot:run
Terminal 2: Widget Library

Bash
cd my-first-widget
npm install && npm run build
# Copy dist/assets/index-xxx.js to ../nexus-ui-engine/public/widget.js
Terminal 3: Next.js Engine

Bash
cd nexus-ui-engine
npm install && npm run dev
