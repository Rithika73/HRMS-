from flask import Flask,send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from models.db import db

from routes.employee import employee
from routes.auth import auth
from routes.attendance import attendance
from routes.leave import leave
from routes.payroll import payroll
from routes.dashboard import dashboard

app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']="mysql+pymysql://root:root123@localhost/smart_hrms"

app.config['JWT_SECRET_KEY']="hrms"

db.init_app(app)

jwt=JWTManager(app)

CORS(app)

app.register_blueprint(employee)
app.register_blueprint(auth)
app.register_blueprint(attendance)
app.register_blueprint(leave)
app.register_blueprint(payroll)
app.register_blueprint(dashboard)


@app.route("/")
def home():

    return "SmartHR Backend Running Successfully"


@app.route('/uploads/<filename>')
def uploaded_file(filename):

    return send_from_directory(
        "uploads",
        filename
    )


with app.app_context():

    db.create_all()


if __name__=="__main__":

    app.run(debug=True)