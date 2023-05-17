from firebase_admin import firestore, initialize_app, credentials


def init():
    cred = credentials.Certificate('src/util/serviceAccount.json')
    initialize_app(cred)


def saveReport(uid, payload):
    payload['uid'] = uid
    payload['createdAt'] = firestore.SERVER_TIMESTAMP

    db = firestore.client()
    coll_ref = db.collection('Reports')

    res = coll_ref.add(payload)

    return (res[1].id)
