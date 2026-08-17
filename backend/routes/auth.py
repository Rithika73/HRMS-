from flask import Blueprint,request,jsonify
from models.employeeModel import Employee

auth=Blueprint(
"auth",
__name__
)

@auth.route(
"/login",
methods=["POST"]
)
def login():

    data=request.json

    print("Received:",data)

    user=Employee.query.filter_by(
        employee_code=data["employee_code"].strip(),
        password=data["password"].strip()
    ).first()

    print("Found User:",user)

    if user:

       return jsonify({

"success":True,

"id":user.id,

"name":user.name,

"role":user.role,

"employee_code":
user.employee_code

})

    return jsonify({

    "success":False,

    "message":"User not found"

    })