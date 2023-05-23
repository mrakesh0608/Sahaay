from fastapi import APIRouter
from pydantic import BaseModel

from util.predictions_analyzer import predictions_analyzer
import util.myfirebase as myfirebase

from keras.models import load_model
from skimage import io
import cv2

router = APIRouter(prefix="/skin-disease-detection", tags=["skin"])


class Item(BaseModel):
    uid: str
    img_url: str


global graph, sess

model = load_model("src/models/skin_infection.h5", compile=True)

classes = {
    0: "Acne or Rosacea",
    1: "Actinic Keratosis or Basal Cell Carcinoma or Malignant Lesions",
    2: "Eczema",
    3: "Melanoma Skin Cancer or Nevi or Moles",
    4: "Psoriasis or Lichen Planus and its related diseases",
    5: "Tinea Ringworm or Candidiasis or Fungal Infections",
    6: "Urticaria or Hives",
    7: "Nail Fungus or Nail Disease",
}


def predict_class(image):
    img = io.imread(image)
    img = cv2.resize(img, (32, 32)) / 255.0

    predictions = (model.predict(img.reshape(1, 32, 32, 3)) * 100.0).round(2)

    return predictions_analyzer(predictions=predictions, classes=classes)


@router.post("/")
async def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url

        label, accuracy = predict_class(img_url)
        # print(label, accuracy)

        if accuracy <= 20:
            print("healthy")
            label = "May have skin disease"
        else:
            print("Not healthy")

        doc_id = myfirebase.saveReport(
            uid,
            {
                "title": "Skin Disease Detection",
                "result": label,
                "img_url": img_url,
                "isDetected": False if accuracy <= 20 else True,
                "accuracy": accuracy,
            },
        )

        return {"data": {"id": doc_id}}

    except Exception as e:
        print(e)
        return {"error": {"message": e.__str__()}}
