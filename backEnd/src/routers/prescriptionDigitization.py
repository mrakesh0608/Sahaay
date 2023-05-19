from fastapi import APIRouter
from pydantic import BaseModel

import util.myfirebase as myfirebase

from keras.models import load_model
from skimage import io
import cv2

router = APIRouter(prefix="/prescription-digitization", tags=["prescription"])


class Item(BaseModel):
    uid: str
    img_url: str


@router.post("/")
async def main(item: Item):
    try:
        uid = item.uid
        img_url = item.img_url

        return {"data": {"msg": "under development"}}

    except Exception as e:
        print(e)
        return {"error": {"message": e.__str__()}}
