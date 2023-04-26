from fastapi import APIRouter

from firebase_admin import auth, firestore

router = APIRouter(
    prefix="/getUser",
    tags=["user"]
)


@router.get("/")
async def main(uid: str):
    try:
        if (not uid):
            raise Exception("Invalid User ID")

        user = auth.get_user(uid)
        userOtherInfo = firestore.client().collection(
            'Users').document(uid).get().to_dict()

        # print('Fetched user data:',user.uid)
        # print(user)
        # print(userOtherInfo)

        return {
            "data": {
                "uid": user.uid,
                "displayName": user.display_name,
                "photoURL": user.photo_url,
                "email": user.email,
                "emailVerified": user.email_verified,
                "phoneNumber": user.phone_number,
                "createdAt": user.user_metadata.creation_timestamp,
                "gender": userOtherInfo.get('gender'),
                "dob": userOtherInfo.get('dob'),
                "bloodgroup": userOtherInfo.get('bloodgroup')
            }
        }
    except Exception as e:
        print(e)
        return {
            "error": {
                "message": e.__str__()
            }
        }
