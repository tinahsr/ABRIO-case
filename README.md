# ABRIO Case

Dies ist das Repository für das ABRIO-Case-Projekt.  
Der Server läuft mit **NestJS**, das Frontend ist in **Angular** implementiert.

---

## Startup

### Docker

Start
````bash
docker build -t abrio-case -f Dockerfile .
docker run -p 8080:8080 -d --name abrio abrio-case
````

Die Website ist nun erreichbar unter:

* **API:** [http://localhost:8080](http://localhost:8080)
* **Swagger:** [http://localhost:8080/api](http://localhost:8080/api)

Stop
````bash
docker stop abrio
docker rm abrio
````

### Lokale Entwicklung ohne Docker

#### Backend starten

1. In das Backend-Verzeichnis wechseln:
````bash
   cd server
   ````
2. Abhängigkeiten installieren:
````bash
   npm install
   ````
3. Server starten:
````bash
   npm run start:dev
   ````

Der Backend-Server läuft nun auf [http://localhost:8080](http://localhost:8080), Swagger unter [http://localhost:8080/api](http://localhost:8080/api).

#### Frontend starten

1. In das Frontend-Verzeichnis wechseln:
````bash
   cd client
   ````
2. Abhängigkeiten installieren:
````bash
   npm install
   ````
3. Projekt builden:
````bash
   npm run build
   ````
4. Angular Server starten:
````bash
   npm run start
   ````

Das Frontend ist nun erreichbar unter [http://localhost:4200](http://localhost:4200).

---
