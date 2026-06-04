# SkateSetup Studio

Microservice Webapplikation zum Planen und Dokumentieren von Skateboard-Setups.

## Services

| Service         | Beschreibung                             | Port |
|-----------------|------------------------------------------|------|
| Frontend        | React + Vite App, Node.js Proxy-Server   | 3000 |
| Storage Service | REST-API, speichert Setups in PostgreSQL | 3001 |
| Mail Service    | REST-API, sendet Mails via Ethereal      | 3002 |
| DB Service      | PostgreSQL Datenbank                     | 5432 |
| DB Admin        | Adminer Web-UI                           | 8080 |

## Applikation starten

Voraussetzung: Docker und Docker Compose sind installiert.

```bash
docker-compose up --build
```

Die App ist erreichbar unter: http://localhost:3000  
Adminer (DB-Verwaltung): http://localhost:8080

### Login Adminer
- System: PostgreSQL
- Server: db-service
- Benutzer: postgres
- Passwort: postgres
- Datenbank: skatesetup

## Frontend lokal starten (ohne Docker)

Voraussetzung: Node.js 20+

```bash
cd frontend
npm install
npm run dev
```

App erreichbar unter: http://localhost:5173

## Storage Service lokal starten

```bash
cd storage-service
npm install
npm start
```

## Mail Service lokal starten

```bash
cd mail-service
npm install
npm start
```