import flask
from flask import request
from flask_cors import CORS, cross_origin


if __name__ == "__main__":
    from predict import predict_ultra_chrome
    from results import get_results
else:
    from server.predict import predict_ultra_chrome
    from server.results import get_results

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["CORS_HEADERS"] = "Content-Type"

CORS(app)


@app.route("/", methods=["GET"])
@cross_origin()
def home():
    return "<h1>ultra-chrome-server</h1><p>Backend server for ultra chrome demo webapp.</p>"


@app.route("/predict/ultra-chrome", methods=["POST"])
@cross_origin()
def predictUltraChrome():
    cell_type = request.json.get("cell")
    return predict_ultra_chrome(cell_type)


@app.route("/results", methods=["GET"])
@cross_origin()
def getResults():
    model = request.json.get("model")
    is_separated = request.json.get("sep")
    return get_results(model, is_separated)


if __name__ == "__main__":
    app.run()
