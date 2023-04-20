import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

import myfirebase
from routers import kidneyStoneDetection as KSD, skinInfectionDetection as SID

app = FastAPI()

app.include_router(KSD.router)
app.include_router(SID.router)


@app.api_route("/", response_class=HTMLResponse, status_code=200, methods=['GET', 'HEAD'])
def index():
    with open("src/templates/index.html", "r") as file:
        return file.read()


myfirebase.init()

if __name__ == "__main__":
    port = os.getenv("PORT") or 8080
    uvicorn.run(app, host="127.0.0.1", port=int(port))
