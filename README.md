# 🚀 Nexus Dashboard Platform

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Node](https://img.shields.io/badge/node-%3E=18-blue)
![Java](https://img.shields.io/badge/java-17+-orange)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

**Nexus Dashboard Platform** is an enterprise-grade **Micro-Frontend (MFE) orchestration system** that enables dynamic UI composition driven entirely by a backend registry. It allows organizations to independently build, deploy, and scale dashboard widgets without rebuilding the host shell.

---

## ✨ Features
- 🔌 Dynamic Micro-Frontend Injection
- 🧠 Registry-Driven UI Composition
- 🏗️ Decoupled Architecture
- 🔐 Role-Based Access Control (RBAC)
- 🗃️ Centralized State Management
- ⚡ Modern Stack (Next.js, Spring Boot, PostgreSQL)

---

## 🧱 Architecture Overview
Shell UI → Registry Backend → PostgreSQL → Widgets

---

## 🛠️ Tech Stack
Frontend: Next.js, TypeScript, Tailwind, Redux Toolkit  
Backend: Java 17, Spring Boot 3  
Database: PostgreSQL  
Tooling: Vite, Maven, NPM/Yarn

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- PostgreSQL

---

## ▶️ Running the Platform

### Start Backend
```bash
cd demo
mvn spring-boot:run
```

### Build Widget
```bash
cd my-first-widget
npm install
npm run build
```

### Start Shell UI
```bash
cd nexus-ui-engine
npm install
npm run dev
```

---

## 📁 Project Structure
```
├── demo/
├── my-first-widget/
├── nexus-ui-engine/
└── README.md
```

---

## 📄 License
MIT License © Manan Singh
