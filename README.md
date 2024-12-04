# REFRAME Dienst der Swisstopo

Die Einbindung erfolgte gemäss Dokumentation auf: https://www.swisstopo.admin.ch/en/rest-api-geoservices-reframe-web

## Verwendung

Eingabe Koordinaten in LV95 und output als WGS84

- Beispiel: 1'200'000 , 2'600'000 --> 47, 7 (als Näherung)

Eingabe Koordinaten in WGS84 und Output als LV95

- Beispiel: 47, 8 --> 1'200'000 , 2'600'000 (als Näherung)

### Lokale Installation

1. `npm` Abhängigkeiten installieren:

```sh
npm install
```

2. dev-Server starten:

```sh
npm run dev
```
