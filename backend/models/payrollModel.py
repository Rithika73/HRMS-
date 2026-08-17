from models.db import db

class Payroll(db.Model):

    __tablename__ = "payroll_data"

    id = db.Column(db.Integer, primary_key=True)

    employee_name = db.Column(db.String(100))
    emp_id = db.Column(db.String(20))   # Changed from Integer to String

    basic = db.Column(db.Float)
    bonus = db.Column(db.Float)
    tax = db.Column(db.Float)
    leaves = db.Column(db.Float)

    net_salary = db.Column(db.Float)
    month = db.Column(db.String(20))