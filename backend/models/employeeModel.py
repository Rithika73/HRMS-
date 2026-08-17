from models.db import db

class Employee(db.Model):

    __tablename__="employees"

    id=db.Column(
        db.Integer,
        primary_key=True
    )

    name=db.Column(
        db.String(100)
    )

    email=db.Column(
        db.String(100)
    )

    department=db.Column(
        db.String(100)
    )

    position=db.Column(
        db.String(100)
    )

    salary=db.Column(
        db.Integer
    )

    joining_date=db.Column(
        db.Date
    )

    photo=db.Column(
        db.String(255)
    )


    employee_code=db.Column(
        db.String(50)
    )


    password=db.Column(
        db.String(100)
    )


    role=db.Column(
        db.String(50)
    )