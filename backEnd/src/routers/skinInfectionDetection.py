from fastapi import APIRouter
from pydantic import BaseModel

import util.myfirebase as myfirebase

from keras.models import load_model
from skimage import io
import cv2

router = APIRouter(
    prefix="/skin-infection-detection",
    tags=["skin"]
)


class Item(BaseModel):
    uid: str
    img_url: str


global graph, sess

model = load_model('src/models/skin_infection.h5', compile=True)

classes = {0: 'Acne/Rosacea',
           1: 'Actinic Keratosis/Basal Cell Carcinoma/Malignant Lesions',
           2: 'Eczema',
           3: 'Melanoma Skin Cancer/Nevi/Moles',
           4: 'Psoriasis/Lichen Planus and related diseases',
           5: 'Tinea Ringworm/Candidiasis/Fungal Infections',
           6: 'Urticaria/Hives',
           7: 'Nail Fungus/Nail Disease'}


def predict_class(image):
    img = io.imread(image)
    img = cv2.resize(img, (32, 32)) / 255.0

    predictions = (model.predict(
        img.reshape(1, 32, 32, 3)) * 100.0).round(2)

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

        label_prediction = ''
        percent = 0
        if dict_dis[max_val] <= 38:
            print('healthy')
            label_prediction = 'Healthy Skin Detected'
        else:
            print('Not healthy')
            label_prediction = str(max_val)
            percent = dict_dis[max_val]

        doc_id = myfirebase.saveReport(uid, {
            "title": "Skin Infection Detection",
            "result": label_prediction,
            "img_url": img_url,
            "isDetected": True if percent > 38 else False,
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
