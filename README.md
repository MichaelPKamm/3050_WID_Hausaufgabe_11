# REFRAME Dienst mit lokaler API

Der Code verwendet eine eigene API um die Berechnung zu vollziehen.

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

### Python environnement aufsetzen

1. `Anaconda promt` eingabe:

```sh
conda create -n 3050_WID_BE python=3.12 -c conda-forge
```

2. `Anaconda promt` eingabe:

```sh
pip install fastapi[standard]
```

3. `Anaconda promt` eingabe:

```sh
pip install pyproj
```

### API-Server starten

1. `Anaconda promt` starten und verzeichnis wählen:

```sh
cd pfad zum REPO\3050_WID_Hausaufgabe_11\API
```

2. Server starten:

```sh
fastapi dev api.py
```
