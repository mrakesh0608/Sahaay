from flask import Flask
import myfirebase

# Routes Imports Starts
import routes.kidneyStoneDetection as KSD
import routes.skinInfectionDet as SID
# Routes Imports Ends

app = Flask(__name__)


@app.route("/")
def main():
    return {"Msg": "Welcome to Sahaay Flask Server"}


app.add_url_rule('/kidney-stone-detection', 'KSD',
                 view_func=KSD.main, methods=['POST'])

app.add_url_rule('/skin-infection-detection', 'SID',
                 view_func=SID.main, methods=['POST'])

myfirebase.init()

# For Development
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8080, debug=True)
# Then, run python app.py

# For Development or Production , run waitress-serve app:app
