from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

import util.myfirebase as myfirebase

from keras.models import load_model
import keras.utils as image
from skimage import io
import numpy as np
import cv2

router = APIRouter(
    prefix="/kidney-stone-detection",
    tags=["kidney"]
)


class Item(BaseModel):
    uid: str
    img_url: str


model = load_model('src/models/kidney_stone.h5')


@router.post("/")
async def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url
        print(uid)
        label_prediction = ''

        preprocessed_img = img_preprocess(img_url)
        result = model.predict(preprocessed_img)

        if result[0][0] == 1:
            label_prediction = "Kidney Stone Detected"
        elif result[0][0] == 0:
            label_prediction = "No Kidney Stone Detected"

        doc_id = myfirebase.saveReport(uid, {
            "title": "Kidney Stone Detection",
            "result": label_prediction,
            "img_url": img_url,
            "isDetected": True if result[0][0] == 1 else False,
            "percent": result[0][0]*100,
        })

        return {
            "data": {
                "id": doc_id
            }
        }
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"error": {"message": e.__str__()}})


def img_preprocess(path):
    img = io.imread(path)
    img = cv2.resize(img, (150, 150))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img
