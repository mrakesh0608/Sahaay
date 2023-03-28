from flask import Flask
import myfirebase

# Routes Imports Starts
import routes.kidneyStoneDetection as KSD
# Routes Imports Ends

app = Flask(__name__)


@app.route("/")
def main():
    return {"Msg": "Welcome to Sahaay Flask Server"}


app.add_url_rule('/kidney-stone-detection', 'KSD',
                 view_func=KSD.main, methods=['POST'])

# if __name__ == "__main__":
#     myfirebase.init()
#     app.run()
