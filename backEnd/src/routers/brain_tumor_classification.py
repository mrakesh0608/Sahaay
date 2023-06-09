from fastapi import APIRouter
from pydantic import BaseModel

from util.predictions_analyzer import predictions_analyzer
import util.myfirebase as myfirebase

from keras.models import load_model
from skimage import io
import cv2

router = APIRouter(prefix="/brain-tumor-classification", tags=["brain"])


class Item(BaseModel):
    uid: str
    img_url: str


global graph, sess

model = load_model("src/models/brain_tumor.h5")

img_size = 200
classes = {0: "Glioma", 1: "Meningioma", 2: "Tumor Not Detected", 3: "Pituitary"}


def predict_class(image):
    img = io.imread(image)
    img = cv2.resize(img, (img_size, img_size)) / 255.0

    predictions = (model.predict(img.reshape(1, img_size, img_size, 3)) * 100.0).round(
        2
    )

    return predictions_analyzer(predictions=predictions, classes=classes)


@router.post("/")
async def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url

        label, accuracy = predict_class(img_url)

        doc_id = myfirebase.saveReport(
            uid,
            {
                "title": "Brain Tumor Detection",
                "result": label,
                "img_url": img_url,
                "isDetected": True if label != "Tumor Not Detected" else False,
                "accuracy": accuracy,
            },
        )

        return {"data": {"id": doc_id}}

    except Exception as e:
        print(e)
        return {"error": {"message": e.__str__()}}
