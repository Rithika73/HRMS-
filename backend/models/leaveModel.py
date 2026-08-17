from models.db import db

class Leave(db.Model):

    __tablename__="leave"

    id=db.Column(
        db.Integer,
        primary_key=True
    )

    employee_name=db.Column(
        db.String(100)
    )

    leave_type=db.Column(
        db.String(100)
    )

    from_date=db.Column(
        db.String(100)
    )

    to_date=db.Column(
        db.String(100)
    )

    reason=db.Column(
        db.String(300)
    )

    status=db.Column(
        db.String(50)
    )