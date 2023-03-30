from flask import request
import myfirebase

from keras.models import load_model
import keras.utils as image
from skimage import io
import numpy as np
import cv2

model = load_model('models/kidney_stone.h5')


def img_preprocess(path):
    img = io.imread(path)
    img = cv2.resize(img, (150, 150))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img


def main():
    try:
        img_url = request.json['img_url']
        uid = request.json['uid']

        label_prediction = ''

        preprocessed_img = img_preprocess(img_url)
        result = model.predict(preprocessed_img)

        print(result)

        if result[0][0] == 1:
            label_prediction = "Skin Infection Detected"
        elif result[0][0] == 0:
            label_prediction = "No Skin Infection Detected"

        doc_id = label_prediction
        # myfirebase.saveReport(uid, {
        #     "title": "Skin Infection Detection",
        #     "result": label_prediction,
        #     "img_url": img_url,
        #     "range": 1 if result[0][0] == 1 else 0,
        # })

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
