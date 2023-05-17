import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

import util.myfirebase as myfirebase
from routers import (
    kidneyStoneDetection as KSD,
    skinInfectionDetection as SID,
    brainTumorDetection as BTD,
    getUser,
    randomImg,
)

myfirebase.init()
app = FastAPI()

app.include_router(BTD.router)
app.include_router(KSD.router)
app.include_router(SID.router)
app.include_router(getUser.router)
app.include_router(randomImg.router)


@app.api_route(
    "/", response_class=HTMLResponse, status_code=200, methods=["GET", "HEAD"]
)
def index():
    with open("src/templates/index.html", "r") as file:
        return file.read()


if __name__ == "__main__":
    port = os.getenv("PORT") or 8080
    uvicorn.run(app, port=int(port))

# For Dev, run uvicorn --app-dir src server:app --reload --host 192.168.0.112
# change host add according to your wifi
