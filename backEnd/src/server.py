import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

import util.myfirebase as myfirebase
from routers import (
    brain_tumor_detection as BTD,
    calorie_estimation as CE,
    getUser,
    kidney_stone_detection as KSD,
    prescription_digitization as PD,
    random_img,
    skin_disease_detection as SDD,
)

myfirebase.init()
app = FastAPI()

app.include_router(PD.router)
app.include_router(BTD.router)
app.include_router(KSD.router)
app.include_router(SDD.router)
app.include_router(CE.router)
app.include_router(getUser.router)
app.include_router(random_img.router)


@app.api_route(
    "/", response_class=HTMLResponse, status_code=200, methods=["GET", "HEAD"]
)
def index():
    with open("src/templates/index.html", "r") as file:
        return file.read()


if __name__ == "__main__":
    port = os.getenv("PORT") or 8080
    uvicorn.run(app, port=int(port))

# For Dev, run pipenv run uvicorn --app-dir src server:app --reload --host 192.168.0.103
# change host add according to your wifi
