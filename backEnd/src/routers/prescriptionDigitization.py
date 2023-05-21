import os
import shutil
import json

from fastapi import APIRouter
from pydantic import BaseModel
from google.oauth2 import service_account
from google.cloud import vision
import requests
import openai

import util.myfirebase as myfirebase

openai.api_key = os.getenv("OPENAI_KEY")

GOOGLE_APPLICATION_CREDENTIALS = os.environ["GOOGLE_APPLICATION_CREDENTIALS_VISION"]

try:
    VISION_API_CREDENTIALS = service_account.Credentials.from_service_account_file(GOOGLE_APPLICATION_CREDENTIALS)
except Exception as e:
    VISION_API_CREDENTIALS = service_account.Credentials.from_service_account_info(GOOGLE_APPLICATION_CREDENTIALS)
    print(e)

router = APIRouter(prefix="/prescription-digitization", tags=["prescription"])


class Item(BaseModel):
    uid: str
    img_url: str

def download_prescription(img_url: str):
    local_filename = img_url.split('/')[-1]
    with requests.get(img_url, stream=True) as r:
        with open(local_filename, 'wb') as f:
            shutil.copyfileobj(r.raw, f)
    return os.path.realpath(f.name)

def detect_handwriting(img_path: str):
    client = vision.ImageAnnotatorClient(credentials=VISION_API_CREDENTIALS)
    with open(img_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)
    text = response.full_text_annotation.text
    return text

def generate_json(detected_text: str):
    prompt = """Generate a JSON representation of doctor information and prescriptions. The JSON should include the following fields:

    "doctors": An array of objects representing doctors. Each doctor object should include the following fields:
        "name": The name of the doctor.
        "prescription": An array of objects representing medicines and their dosage. Each prescription object should include the following fields:
            "medicine": The name of the prescribed medicine that is an actual medicine.
            "quantity": The quantity of the medicine prescribed.
            "dosage": The prescribed dosage instructions.

Please generate a JSON representation based on the given information. If any data is missing or not available, use null as the value.
The given information is: {}
""".format(detected_text)
    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=  [{"role": "user", "content": prompt}], max_tokens = 2048)
    return json.loads(chat_completion.choices[0].message.content)


@router.post("/")
async def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url
        img_path = download_prescription(img_url=img_url)
        content = generate_json(str(detect_handwriting(img_path=img_path)))
        content["title"] = "Prescription Digitization"
        content["img_url"] = img_url
        doc_id = myfirebase.saveReport(uid, content)

        return {
            "data": {
                "id": doc_id
            }
        }
    except Exception as e:
        print(e)
        return {"error": {"message": e.__str__()}}
