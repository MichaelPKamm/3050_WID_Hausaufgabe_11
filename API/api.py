from fastapi import FastAPI
from fastapi import responses
from fastapi.staticfiles import StaticFiles
from pyproj import Transformer, transform

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


#Abfrage: http://127.0.0.1:8000/wgs84lv95?lat=47&long=8
@app.get("/wgs84lv95")
async def convertwgs84(lat:int, long:int):
    #always_xy nimmt die Koordinaten als Mathematischen Input (X nach Osten, Y nach Norden)
    transformer = Transformer.from_crs(4326, 2056, always_xy=True)
    Easting, Northing =transformer.transform(long, lat)
    return {"Northing":Northing,"Easting":Easting}



#Abfrage: http://127.0.0.1:8000/lv95wgs84?Northing=1200000&Easting=2600000
@app.get("/lv95wgs84")
async def convertlv95(Northing:int, Easting:int):
    #always_xy nimmt die Koordinaten als Mathematischen Input (X nach Osten, Y nach Norden)
    transformer = Transformer.from_crs(2056, 4326, always_xy=True)
    long, lat =transformer.transform(Easting, Northing)
    return {"Northing":long,"Easting":lat}