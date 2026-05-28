# SkateSetup Studio

Microservice-Webapplikation zum Planen und Dokumentieren von Skateboard-Setups.

## Übersicht

Dieses Projekt besteht aus mehreren Services:

- `frontend`: React-Anwendung mit Vite und einem kleinen Node.js-Proxy für API-Aufrufe.
- `storage-service`: Express-REST-API, die Setups in PostgreSQL speichert.
- `mail-service`: Express-REST-API, die E-Mails über Ethereal verschickt.
- `db-service`: PostgreSQL-Datenbank.
- `db-admin`: Adminer für die Datenbank-Verwaltung.

## Services

| Service         | Beschreibung                             | Port |
|-----------------|------------------------------------------|------|
| Frontend        | React + Vite App, Node.js Proxy-Server   | 3000 (Docker) |
| Storage Service | REST-API, speichert Setups in PostgreSQL | 3001 |
| Mail Service    | REST-API, sendet Mails via Ethereal      | 3002 |
| DB Service      | PostgreSQL Datenbank                     | 5432 |
| DB Admin        | Adminer Web-UI                           | 8080 |

## Mit Docker starten

Voraussetzung: Docker und Docker Compose sind installiert.

```bash
docker compose up --build
```

Anschließend:

- Frontend: http://localhost:3000
- Adminer: http://localhost:8080

### Stoppen

```bash
docker compose down
```

## Frontend lokal starten (ohne Docker)

Voraussetzung: Node.js 20+

```bash
cd frontend
npm install
npm run dev
```

Die lokale Entwicklungsumgebung startet standardmäßig auf:

- http://localhost:5173

## Backend lokal starten (ohne Docker)

### Storage Service

```bash
cd storage-service
npm install
npm start
```

### Mail Service

```bash
cd mail-service
npm install
npm start
```

## Lokale API-URLs

Beim lokalen Entwickeln leitet Vite folgende Pfade weiter:

- `/api/storage` → `http://localhost:3001`
- `/api/mail` → `http://localhost:3002`

Das bedeutet, das Frontend kann die Backend-Services über die eigenen Pfade ansprechen.

## Datenbank

Die PostgreSQL-Datenbank wird von Docker mit folgenden Zugangsdaten konfiguriert:

- Benutzer: `postgres`
- Passwort: `postgres`
- Datenbank: `skatesetup`

## Hinweise

- Das Mail-Service verwendet Ethereal für Test-E-Mails. Es zeigt eine Vorschau-URL an, die im Terminal geloggt wird.
- Statische Frontend-Builds werden in `frontend/dist/` erzeugt.
- Lokale Umgebungsdateien wie `.env` sollten nicht in Git eingecheckt werden.
