import flask
from flask_cors import CORS, cross_origin


# if __name__ == "__main__":
#     from scraper import scrape
#     from database import savePortfolio, getLastPortfolio, getAllPortfolios
# else:
#     from app.scraper import scrape
#     from app.database import savePortfolio, getLastPortfolio, getAllPortfolios

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["CORS_HEADERS"] = "Content-Type"

CORS(app)


@app.route("/", methods=["GET"])
@cross_origin()
def home():
    return "<h1>ultra-chrome-server</h1><p>Backend server for ultra chrome demo webapp.</p>"


# @app.route("/portfolio", methods=["GET"])
# @cross_origin()
# def portfolio():
#     return getLastPortfolio()


# @app.route("/portfolio/all", methods=["GET"])
# @cross_origin()
# def allPortfolio():
#     return getAllPortfolios()


# @app.route("/portfolio/update", methods=["GET"])
# @cross_origin()
# def updatePortfolio():
#     new_portfolio = scrape()
#     print("new portfolio", new_portfolio)
#     return savePortfolio(new_portfolio)


if __name__ == "__main__":
    app.run()
