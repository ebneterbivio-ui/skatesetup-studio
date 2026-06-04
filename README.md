# SkateSetup Studio

Persönliches Logbuch für Skateboard-Setups. Setups planen, per Mail senden und gefahrene Setups dokumentieren.

---

## Voraussetzungen

Bevor du startest, stelle sicher dass folgendes installiert ist:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (muss geöffnet und grün sein)
- [Node.js 20+](https://nodejs.org/) (nur für lokales Entwickeln ohne Docker nötig)

---

## Applikation starten (Docker)

**Schritt 1:** Docker Desktop öffnen und warten bis unten links „Engine running" steht

**Schritt 2:** Terminal öffnen und in den Projektordner navigieren:

```bash
cd skatesetup-studio
```

**Schritt 3:** Applikation bauen und starten:

```bash
docker-compose up --build
```

**Schritt 4:** Warten bis alle Services gestartet sind. Du solltest folgendes sehen:
✔ Storage Service läuft auf Port 3001
✔ Mail Service läuft auf Port 3002
✔ Frontend server running on port 3000
✔ database system is ready to accept connections

text

**Schritt 5:** App im Browser öffnen:

| URL | Beschreibung |
|-----|-------------|
| http://localhost:3000 | Applikation |
| http://localhost:8080 | Adminer (Datenbank-Verwaltung) |

---

## Applikation stoppen

```bash
docker-compose down
```

Mit Volume löschen (Datenbank zurücksetzen):

```bash
docker-compose down -v
```

---

## Services Übersicht

| Service | Beschreibung | Port |
|---------|-------------|------|
| Frontend | React + Vite App, Node.js Proxy-Server | 3000 |
| Storage Service | REST-API, speichert Setups in PostgreSQL | 3001 |
| Mail Service | REST-API, sendet Mails via Ethereal | 3002 |
| DB Service | PostgreSQL Datenbank | 5432 |
| DB Admin | Adminer Web-UI zur Datenbank-Verwaltung | 8080 |

---

## Adminer Login (Datenbank)

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
2. Fülle alle Felder aus (Name, Deck, Trucks, Wheels, Bearings, Einsatzzweck)
3. Gib eine E-Mail-Adresse ein
4. Klick auf **„Per Mail senden"**
5. Im grünen Banner erscheint eine Vorschau-URL → im Browser öffnen um die Mail zu sehen

> ℹ️ Die App verwendet Ethereal — ein Fake-Mailservice zum Testen. Es wird keine echte Mail gesendet. Die Mail ist nur über den Vorschau-Link sichtbar.

### Setup dokumentieren
1. Navigiere zu **„Meine Setups"**
2. Fülle das Formular aus inkl. Bewertung und Feedback
3. Klick auf **„Setup speichern"**
4. Das Setup erscheint rechts in der Liste

### Setup löschen
1. In der Liste auf das **✕** oben rechts auf der Karte klicken
2. Bestätigen → Setup wird aus der Datenbank gelöscht

---

## Lokale Entwicklung (ohne Docker)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

→ http://localhost:5173

### Storage Service

```bash
cd storage-service
npm install
npm start
```

→ http://localhost:3001

### Mail Service

```bash
cd mail-service
npm install
npm start
```

→ http://localhost:3002

> ⚠️ Für die lokale Entwicklung ohne Docker wird eine laufende PostgreSQL-Instanz benötigt.

---

## Häufige Probleme

| Problem | Lösung |
|---------|--------|
| `docker daemon not running` | Docker Desktop öffnen und warten bis Engine grün ist |
| `column does not exist` Fehler | Datenbank zurücksetzen mit `docker-compose down -v` dann `docker-compose up` |
| Falscher Ordner | Sicherstellen dass du im `skatesetup-studio/` Ordner bist, nicht in einem Unterordner |
| Änderungen werden nicht übernommen | `docker-compose up --build` statt `docker-compose up` |