from models.db import db

class Attendance(db.Model):

    __tablename__="attendance"

    id=db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id=db.Column(
        db.Integer
    )

    employee_name=db.Column(
        db.String(100)
    )

    checkin=db.Column(
        db.String(50)
    )

    checkout=db.Column(
        db.String(50)
    )

    date=db.Column(
        db.String(50)
    )

    status=db.Column(
        db.String(50)
    )