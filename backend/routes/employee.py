from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
from models.employeeModel import Employee
from models.db import db
from datetime import datetime
import os

employee = Blueprint(
    "employee",
    __name__
)


# ================= GET ALL =================

@employee.route(
    "/employees",
    methods=["GET"]
)
def getEmployees():

    data=Employee.query.all()

    result=[]

    for emp in data:

        result.append({

            "id":emp.id,
            "name":emp.name,
            "email":emp.email,
            "department":emp.department,
            "position":emp.position,
            "salary":emp.salary,
            "photo":emp.photo,
            "employee_code":emp.employee_code,
            "role":emp.role

        })

    return jsonify(result)



# ================= GET SINGLE =================

@employee.route(
"/employee/<int:id>",
methods=["GET"]
)
def getSingleEmployee(id):

    emp=Employee.query.get(id)

    if not emp:

        return jsonify({

            "message":"Employee Not Found"

        }),404


    return jsonify({

        "id":emp.id,
        "name":emp.name,
        "email":emp.email,
        "department":emp.department,
        "position":emp.position,
        "salary":emp.salary,
        "employee_code":emp.employee_code,
        "photo":emp.photo,
        "role":emp.role

    })
 


# ================= ADD =================

@employee.route(
    "/employees",
    methods=["POST"]
)
def addEmployee():

    try:

        join_date=None

        if request.form.get(
            "joining_date"
        ):

            join_date=datetime.strptime(

                request.form.get(
                    "joining_date"
                ),

                "%Y-%m-%d"

            )


        emp=Employee(

            name=request.form.get(
                "name"
            ),

            email=request.form.get(
                "email"
            ),

            department=request.form.get(
                "department"
            ),

            position=request.form.get(
                "position"
            ),

            salary=request.form.get(
                "salary"
            ),

            joining_date=join_date,

            password="123456",

            role="employee"

        )


        db.session.add(emp)

        db.session.commit()


        emp.employee_code="EMP"+str(
            1000+emp.id
        )


        db.session.commit()


        return jsonify({

            "message":"Employee Added",

            "id":emp.id

        })

    except Exception as e:

        return jsonify({

            "error":str(e)

        }),500



# ================= UPDATE =================

@employee.route(
    "/employees/<int:id>",
    methods=["PUT"]
)
def updateEmployee(id):

    try:

        emp=Employee.query.get(id)

        if not emp:

            return jsonify({

                "message":"Employee Not Found"

            }),404


        emp.name=request.form.get(
            "name",
            emp.name
        )

        emp.email=request.form.get(
            "email",
            emp.email
        )

        emp.department=request.form.get(
            "department",
            emp.department
        )

        emp.position=request.form.get(
            "position",
            emp.position
        )

        emp.salary=request.form.get(
            "salary",
            emp.salary
        )


        db.session.commit()


        return jsonify({

            "message":"Updated"

        })


    except Exception as e:

        return jsonify({

            "error":str(e)

        }),500




# ================= DELETE =================

@employee.route(
    "/employees/<int:id>",
    methods=["DELETE"]
)
def deleteEmployee(id):

    emp=Employee.query.get(id)

    db.session.delete(emp)

    db.session.commit()

    return jsonify({

        "message":"Deleted"

    })




# ================= PHOTO =================

@employee.route(
    "/upload/<int:id>",
    methods=["POST"]
)
def uploadPhoto(id):

    try:

        emp=Employee.query.get(id)

        if not emp:

            return jsonify({
                "error":"Employee Not Found"
            })


        if "photo" not in request.files:

            return jsonify({
                "error":"No File"
            })


        file=request.files["photo"]


        filename=secure_filename(
            file.filename
        )


        os.makedirs(
            "uploads",
            exist_ok=True
        )


        path=os.path.join(
            "uploads",
            filename
        )


        file.save(path)


        emp.photo=filename


        db.session.commit()


        return jsonify({

            "message":"Photo Uploaded"

        })


    except Exception as e:

        return jsonify({

            "error":str(e)

        }),500