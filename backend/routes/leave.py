from flask import Blueprint, request, jsonify
from models.leaveModel import Leave
from models.db import db

leave = Blueprint("leave", __name__)


# ================= APPLY LEAVE =================

@leave.route("/leave", methods=["POST"])
def applyLeave():

    data = request.json

    newLeave = Leave(
        employee_name=data.get("employee_name"),
        leave_type=data.get("leave_type"),
        from_date=data.get("from_date"),
        to_date=data.get("to_date"),
        reason=data.get("reason"),
        status="Pending"
    )

    db.session.add(newLeave)
    db.session.commit()

    return jsonify({"message": "Leave Applied"})


# ================= ADMIN VIEW ALL =================

@leave.route("/leave", methods=["GET"])
def getLeaves():

    data = Leave.query.all()

    result = []

    for x in data:
        result.append({
            "id": x.id,
            "employee_name": x.employee_name,
            "leave_type": x.leave_type,
            "from_date": x.from_date,
            "to_date": x.to_date,
            "reason": x.reason,
            "status": x.status
        })

    return jsonify(result)


# ================= EMPLOYEE VIEW OWN =================

@leave.route("/myleave/<name>", methods=["GET"])
def myLeave(name):

    data = Leave.query.filter_by(employee_name=name).all()

    result = []

    for x in data:
        result.append({
            "id": x.id,
            "leave_type": x.leave_type,
            "from_date": x.from_date,
            "to_date": x.to_date,
            "reason": x.reason,
            "status": x.status
        })

    return jsonify(result)


# ================= APPROVE (OLD ROUTE) =================

@leave.route("/approveleave/<int:id>", methods=["PUT"])
def approveLeave(id):

    leave_data = Leave.query.get(id)

    if not leave_data:
        return jsonify({"message": "Leave not found"}), 404

    leave_data.status = "Approved"

    db.session.commit()

    return jsonify({"message": "Approved"})


# ================= APPROVE (NEW ROUTE FOR FRONTEND) =================

@leave.route("/approve/<int:id>", methods=["PUT"])
def approveLeaveNew(id):

    leave_data = Leave.query.get(id)

    if not leave_data:
        return jsonify({"message": "Leave not found"}), 404

    leave_data.status = "Approved"

    db.session.commit()

    return jsonify({"message": "Approved"})


# ================= REJECT (OLD ROUTE) =================

@leave.route("/rejectleave/<int:id>", methods=["PUT"])
def rejectLeave(id):

    leave_data = Leave.query.get(id)

    if not leave_data:
        return jsonify({"message": "Leave not found"}), 404

    leave_data.status = "Rejected"

    db.session.commit()

    return jsonify({"message": "Rejected"})


# ================= REJECT (NEW ROUTE FOR FRONTEND) =================

@leave.route("/reject/<int:id>", methods=["PUT"])
def rejectLeaveNew(id):

    leave_data = Leave.query.get(id)

    if not leave_data:
        return jsonify({"message": "Leave not found"}), 404

    leave_data.status = "Rejected"

    db.session.commit()

    return jsonify({"message": "Rejected"})