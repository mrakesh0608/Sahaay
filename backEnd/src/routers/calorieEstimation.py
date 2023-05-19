from fastapi import APIRouter
from pydantic import BaseModel

import util.myfirebase as myfirebase

import requests
from PIL import Image
import io

url = "https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition/full?user_key=47661fd0c69175a5f2c7b4b3e060e8a0"

router = APIRouter(prefix="/calories-estimation", tags=["img"])


class Item(BaseModel):
    uid: str
    img_url: str


def int_to_str(num):
    num = round(num, 2)
    num = f"{float(num):g}"
    return str(num)


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
                print("Image uploaded successfully.")
                json = response.json()
            else:
                print("Error uploading the image:", response.text)
        else:
            print("Error fetching the image:", response.status_code)

        nut = json["results"][0]["items"][0]["nutrition"]

        doc_id = myfirebase.saveReport(
            uid,
            {
                "title": "Calories Estimation",
                "img_url": img_url,
                "is_food": json["is_food"],
                "food_name": json["results"][0]["items"][0]["name"],
                "nutrition": {
                    "calcium": int_to_str(nut["calcium"] * 1000000) + " mg",
                    "calories": int_to_str(nut["calories"]) + " kcal",
                    "dietary fiber": int_to_str(nut["dietaryFiber"] * 1000) + " g",
                    "iron": int_to_str(nut["iron"] * 1000000) + " μg",
                    "potassium": int_to_str(nut["potassium"] * 1000) + " mg",
                    "protein": int_to_str(nut["protein"] * 1000) + " g",
                    "sodium": int_to_str(nut["sodium"] * 1000000) + " mg",
                    "total fat": int_to_str(nut["totalFat"] * 1000) + " g",
                    "vitamin A": int_to_str(nut["vitaminA"] * 1000000) + " μg",
                    "sugar": int_to_str(nut["sugars"] * 1000) + " g",
                    "total carbohydrates": int_to_str(nut["totalCarbs"] * 1000) + " g",
                },
            },
        )

        return {"data": {"id": doc_id}}
    except Exception as e:
        print("catch err", e)
        return {"error": {"message": e.__str__()}}
