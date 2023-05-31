from fastapi import APIRouter
from pydantic import BaseModel
import os
import util.myfirebase as myfirebase
import util.readable_units as r_units
import requests
from PIL import Image
import io

from dotenv import load_dotenv

load_dotenv(dotenv_path="configs/.env")

key = os.getenv("CALORIE_MAMA")

url = f"https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition/pg?user_key={key}"

router = APIRouter(prefix="/calories-estimation", tags=["img"])


class Item(BaseModel):
    uid: str
    img_url: str


@router.post("/")
def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url
        # Fetch the image from the URL
        response = requests.get(img_url)

        # Check if the request was successful
        if response.status_code == 200:
            # Open the fetched image
            image = Image.open(io.BytesIO(response.content))

            # Convert RGBA to RGB to support PNG files also
            image = image.convert("RGB")

            # Resize the image
            resized_image = image.resize((544, 544))

            # Create an in-memory buffer to store the resized image
            image_buffer = io.BytesIO()
            resized_image.save(image_buffer, format="JPEG")
            image_buffer.seek(0)

            # Create a dictionary to hold the form data
            form_data = {"file": ("resized_image.jpg", image_buffer, "image/jpeg")}

            response = requests.post(url, files=form_data)

            # Check the response
            if response.status_code == 200:
                json = response.json()
            else:
                print("Error uploading the image:", response.text)
                raise Exception(response.text)
        else:
            print("Error fetching the image:", response.status_code)
            raise Exception("Internal Server Error")

        nut = json["results"][0]["items"][0]["nutrition"]
        print(json["results"][0]["items"][0])
        # convert SI Unit to human readable units & concat unit
        doc_id = myfirebase.saveReport(
            uid,
            {
                "title": "Calories Estimation",
                "img_url": img_url,
                "is_food": json["is_food"],
                "food_name": json["results"][0]["items"][0]["name"],
                "nutrition": r_units.convert_SI_to_human_units(nut),
            },
        )

        return {"data": {"id": doc_id}}
    except Exception as e:
        print("err", e)
        return {"error": {"message": e.__str__()}}
