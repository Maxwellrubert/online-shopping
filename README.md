# Online Shopping, Fullstack

This repository contains a small full-stack application:
- Backend: Spring Boot REST API (Java 17, Spring Boot 3.x)
- Frontend: React (create-react-app)
- Mobile: Expo / React Native (optional)
- Database: MySQL (docker-compose provided)

This README was trimmed to remove tutorial-oriented learning notes. The project is ready for development and local runs.

## Quick start (recommended order)

1) Start database via Docker Compose

```powershell
cd "c:\Users\maxwe\Documents\VS Code\CapeStart\shopping-fullstack"
docker-compose up -d
docker ps
```

# Online Shopping — Fullstack

This repository is a small full-stack demo app intended for learning and local development.

Overview
- Backend: Spring Boot REST API (Java 17, Maven)
- Frontend: React (Create React App)
- Mobile: Expo / React Native (optional)
- Database: MySQL (Docker Compose provided)

Status
- Cleaned of tutorial-only comments; core code and `README` are ready for local runs.

Run locally (recommended)

1) Start database (uses the included docker-compose)

```powershell
cd "c:\Users\maxwe\Documents\VS Code\CapeStart\shopping-fullstack"
docker-compose up -d
docker ps
```

2) Start backend (Spring Boot)

```powershell
cd backend
.\n+\mvnw.cmd spring-boot:run     # on PowerShell: .\mvnw.cmd spring-boot:run
# or, if you have Maven installed: mvn spring-boot:run
```

The backend defaults to http://localhost:8080 (see `backend/src/main/resources/application.properties`).

3) Run the frontend

```powershell
cd frontend
npm install    # first-time only
npm start
```

Frontend dev server: http://localhost:3000

4) Mobile (Expo)

```powershell
cd mobile
npm install
npm run start
```

Useful endpoints (examples)
- POST  /api/auth/login
- GET   /api/products
- GET   /api/categories
- GET   /api/dashboard/stats


