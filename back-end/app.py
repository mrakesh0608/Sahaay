from keras.models import load_model
import cv2
import keras.utils as image
from flask import Flask
from skimage import io
import numpy as np

app = Flask(__name__)


@app.route("/")
def main():
    return {"Msg": "Welcome to Sahaay Flask Server"}


@app.route("/kidney")
def kidney():
    # Function to Predict CNN

    model = load_model('models/kidney_stone_CNN.h5')

    label_prediction = ''
    image_name = 'https://firebasestorage.googleapis.com/v0/b/sahaay-6a05b.appspot.com/o/Kidney%20Stone%20Model%2Ftest.jpg?alt=media&token=8ddb30ea-15fe-4f37-aab6-3c7d6f1da9e4'

    print(image_name)
    test_img = io.imread(image_name)
    test_img = cv2.resize(test_img, (150, 150))
    # test_img = image.load_img(image_name, target_size=(150, 150))
    print(test_img)
    test_img = image.img_to_array(test_img)
    print(test_img)
    test_img = np.expand_dims(test_img, axis=0)
    print(test_img)
    result = model.predict(test_img)
    if result[0][0] == 1:
        label_prediction = "Kidney Stone Detected"
    elif result[0][0] == 0:
        label_prediction = "No Kidney Stone Detected"

    return {"Msg": label_prediction}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
