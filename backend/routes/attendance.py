from flask import Blueprint,jsonify
from models.attendanceModel import Attendance
from models.employeeModel import Employee
from models.db import db
from datetime import datetime

attendance=Blueprint(
"attendance",
__name__
)


@attendance.route(
"/checkin/<int:id>",
methods=["POST"]
)
def checkin(id):

    emp=Employee.query.get(id)

    if not emp:

        return jsonify({
        "message":"Not Found"
        })


    new=Attendance(

    employee_id=emp.id,

    employee_name=emp.name,

    checkin=datetime.now().strftime(
    "%H:%M:%S"
    ),

    checkout="-",

    date=datetime.now().strftime(
    "%Y-%m-%d"
    ),

    status="Present"

    )

    db.session.add(new)

    db.session.commit()

    return jsonify({

    "message":"success"

    })



@attendance.route(
"/checkout/<int:id>",
methods=["POST"]
)
def checkout(id):

    row=Attendance.query.filter_by(
    employee_id=id
    ).order_by(
    Attendance.id.desc()
    ).first()


    if row:

        row.checkout=(
        datetime.now().strftime(
        "%H:%M:%S"
        )
        )

        db.session.commit()


    return jsonify({
    "message":"done"
    })



@attendance.route(
"/attendance",
methods=["GET"]
)
def allAttendance():

    data=Attendance.query.all()

    result=[]

    for x in data:

        result.append({

        "id":x.id,
        "name":x.employee_name,
        "checkin":x.checkin,
        "checkout":x.checkout,
        "date":x.date,
        "status":x.status

        })

    return jsonify(result)



@attendance.route(
"/attendance/<int:id>",
methods=["GET"]
)
def myAttendance(id):

    data=Attendance.query.filter_by(
    employee_id=id
    ).all()


    result=[]

    for x in data:

        result.append({

        "date":x.date,
        "checkin":x.checkin,
        "checkout":x.checkout,
        "status":x.status

        })


    return jsonify(result)