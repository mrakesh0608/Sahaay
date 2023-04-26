from fastapi import APIRouter
from pydantic import BaseModel

import util.myfirebase as myfirebase

from keras.models import load_model
from skimage import io
import cv2

router = APIRouter(
    prefix="/brain-tumor-detection",
    tags=["brain"]
)


class Item(BaseModel):
    uid: str
    img_url: str


global graph, sess

model = load_model('src/models/brain_tumor.h5')

img_size = 200
classes = {0: 'glioma',
           1: 'meningioma',
           2: 'notumor',
           3: 'pituitary'
           }


def predict_class(image):
    img = io.imread(image)
    img = cv2.resize(img, (img_size, img_size)) / 255.0

    predictions = (model.predict(
        img.reshape(1, img_size, img_size, 3)) * 100.0).round(2)

    pred_dict = {}

    for x in classes:
        pred_dict[classes[x]] = predictions[0][x]
    return pred_dict


@router.post("/")
async def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url

        result = predict_class(img_url)

        dict_dis = sorted(result.items(), key=lambda x: x[1], reverse=True)
        dict_dis = dict(
            sorted(result.items(), key=lambda x: x[1], reverse=True)[:3])
        print(dict_dis)

        max_val = max(dict_dis, key=dict_dis.get)

        label_prediction = str(max_val)
        percent = dict_dis[max_val]

        doc_id = myfirebase.saveReport(uid, {
            "title": "Brain Tumor Detection",
            "result": label_prediction,
            "img_url": img_url,
            "isDetected": True if label_prediction != 'notumor' else False,
            "percent": float(percent)
        })

        return {
            "data": {
                "id": doc_id
            }
        }

    except Exception as e:
        print(e)
        return {
            "error": {
                "message": e.__str__()
            }
        }