from flask import Blueprint, jsonify
from models.employeeModel import Employee
from models.attendanceModel import Attendance
from models.leaveModel import Leave
from models.payrollModel import Payroll

dashboard = Blueprint("dashboard", __name__)

@dashboard.route("/dashboard", methods=["GET"])
def get_dashboard():

    employees = Employee.query.count()

    present = Attendance.query.filter_by(status="Present").count()

    leaves_approved = Leave.query.filter_by(status="Approved").count()
    leaves_pending = Leave.query.filter_by(status="Pending").count()

    payroll_total = sum([p.net_salary for p in Payroll.query.all()])

    return jsonify({
        "employees": employees,
        "present": present,
        "leaves_approved": leaves_approved,
        "leaves_pending": leaves_pending,
        "payroll_total": payroll_total
    })