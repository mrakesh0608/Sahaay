from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials


def init():
    cred = credentials.Certificate('serviceAccount.json')
    firebase_admin.initialize_app(cred)


def saveReport(uid, payload):
    db = firestore.client()

    coll_ref = db.collection('Users').document(uid).collection('Reports')

    payload['uid'] = uid
    payload['createdAt'] = firestore.SERVER_TIMESTAMP
    
    res = coll_ref.add(payload)

    return (res[1].id)
