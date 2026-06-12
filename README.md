# SkateSetup Studio

Persönliches Logbuch für Skateboard-Setups. Setups planen, per Mail senden und gefahrene Setups dokumentieren und löschen.

---

## Voraussetzungen

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — muss geöffnet und grün sein
- [Node.js 20+](https://nodejs.org/) — nur für lokale Entwicklung ohne Docker

---

## Applikation starten (Docker)

**Schritt 1:** Docker Desktop öffnen — warten bis unten links „Engine running" grün angezeigt wird

**Schritt 2:** Terminal öffnen und in den Projektordner navigieren:

```bash
cd skatesetup-studio
```

**Schritt 3:** Applikation bauen und starten:

```bash
docker-compose up --build
```

**Schritt 4:** Warten bis alle 5 Services gestartet sind:
Frontend Service läuft auf Port 3000
Storage Service läuft auf Port 3001
Mail Service läuft auf Port 3002
Datenbank initialisiert
database system is ready to accept connections

text

**Schritt 5:** App im Browser öffnen:

| URL | Beschreibung |
|-----|-------------|
| http://localhost:3000 | Applikation |
| http://localhost:8080 | Adminer — Datenbank-Verwaltung |

---

## Applikation stoppen

```bash
docker-compose down
```

Datenbank komplett zurücksetzen (Volume löschen):

```bash
docker-compose down -v
```

---

## Services Übersicht

| Service | Beschreibung | Port |
|---------|-------------|------|
| frontend-service | React + Vite App, Express Proxy-Server | 3000 |
| storage-service | REST-API, speichert Setups in PostgreSQL | 3001 |
| mail-service | REST-API, sendet Mails via Ethereal | 3002 |
| db-service | PostgreSQL Datenbank | 5432 |
| db-admin | Adminer Web-UI | 8080 |

---

## Adminer Login

URL: http://localhost:8080

| Feld | Wert |
|------|------|
| System | PostgreSQL |
| Server | db-service |
| Benutzer | postgres |
| Passwort | postgres |
| Datenbank | skatesetup |

---

## Funktionen

### Setup planen
1. Navigiere zu **„Setup planen"**
2. Fülle alle Felder aus: Name, Deck, Trucks, Wheels, Bearings, Einsatzzweck
3. Gib eine E-Mail-Adresse ein
4. Klick auf **„Per Mail senden"**
5. Im grünen Banner erscheint eine Vorschau-URL → im Browser öffnen um die Mail zu sehen

> Die App verwendet Ethereal — ein Fake-Mailservice für Tests. Es wird keine echte Mail gesendet. Die Mail ist nur über den Vorschau-Link sichtbar.

### Setup dokumentieren
1. Navigiere zu **„Meine Setups"**
2. Fülle das Formular aus inkl. Bewertung und Feedback
3. Klick auf **„Setup speichern"**
4. Das Setup erscheint rechts in der Liste

### Setup löschen
1. In der Liste auf das **✕** oben rechts auf der Karte klicken
2. Bestätigen → Setup wird aus der PostgreSQL-Datenbank gelöscht

---

## Lokale Entwicklung ohne Docker

### frontend-service

```bash
cd frontend-service
npm install
npm run dev
```

→ http://localhost:5173

### storage-service

```bash
cd storage-service
npm install
npm start
```

→ http://localhost:3001

### mail-service

```bash
cd mail-service
npm install
npm start
```

→ http://localhost:3002

> Für lokale Entwicklung ohne Docker wird eine laufende PostgreSQL-Instanz benötigt.

---

## Häufige Probleme

| Problem | Lösung |
|---------|--------|
| `docker daemon not running` | Docker Desktop öffnen, warten bis Engine grün ist |
| `column does not exist` Fehler | `docker-compose down -v` dann `docker-compose up --build` |
| Änderungen werden nicht übernommen | `docker-compose up --build` statt `docker-compose up` |
| Falscher Ordner | Sicherstellen dass du im `skatesetup-studio/` Ordner bist |