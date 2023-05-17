from fastapi import APIRouter

import requests
import random
import json

router = APIRouter(prefix="/randomImg", tags=["img"])

# Creates/Refreshes Datasets images list in json file


@router.get("/refresh")
async def main(dataset: str):
    try:
        path = ""
        sub_folder = []

        if dataset == "brain-tumor":
            path = "Brain-Tumor-Classification/contents/Dataset/Test"
            sub_folder = ["notumor", "glioma", "meningioma", "pituitary"]

        elif dataset == "kidney-stone":
            path = "Kidney-Stone-Classification/contents/dataset/test"
            sub_folder = ["Normal", "Stone", "Cyst", "Tumor"]

        elif dataset == "skin-infection":
            path = "Skin-Infection-Classification/contents/Dataset/test"
            sub_folder = [
                "Acne and Rosacea Photos",
                "Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions",
                "Eczema Photos",
                "Melanoma Skin Cancer Nevi and Moles",
                "Psoriasis pictures Lichen Planus and related diseases",
                "Tinea Ringworm Candidiasis and other Fungal Infections",
                "Urticaria Hives",
                "Nail Fungus and other Nail Disease",
            ]
        elif dataset == "prescription":
            path = f"Prescription-Digitization"
            sub_folder = []

        img_url_list = []

        for x in sub_folder:
            r = requests.get(f"https://api.github.com/repos/mrakesh0608/{path}/{x}")

            list = r.json()

            for x in list:
                img_url_list.append(x["download_url"])

        # Serializing json
        json_object = json.dumps(img_url_list, indent=4)

        # Writing to sample.json
        with open(f"src/dataset/{dataset}.json", "w") as outfile:
            outfile.write(json_object)

        return {"data": {"status": "Ok", "dataset": dataset, "size": len(img_url_list)}}
    except Exception as e:
        print(e)
        return {"error": {"message": e.__str__()}}


# sends a random img from dataset json file


@router.get("/")
async def main(dataset: str):
    try:
        with open(f"src/dataset/{dataset}.json", "r") as openfile:
            json_object = json.load(openfile)

        # print(json_object)
        # print(type(json_object))

        return {
            "data": {"randomImgURL": random.choice(json_object), "dataset": dataset}
        }
    except Exception as e:
        print(e)
        return {"error": {"message": e.__str__()}}
