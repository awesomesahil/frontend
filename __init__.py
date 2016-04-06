from flask import Flask, url_for
from flask.ext.cors import CORS
import Customer, Admin, Product
app = Flask(__name__)
app.config['SECRET_KEY'] = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.config['UPLOAD_FOLDER'] = '.'
app.config['MAX_CONTENT_LENGTH'] = 18 * 1024 * 1024

CORS(app)

@app.route("/")
def home():
  try:
    return app.send_static_file("index.html")
  except Exception as e:
    return str(e)

Admin.add_routes(app)
Customer.add_routes(app)
Product.add_routes(app)

if __name__ == "__main__":
  app.run(host='0.0.0.0')
