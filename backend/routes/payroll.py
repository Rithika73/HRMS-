from flask import Blueprint, request, jsonify, send_file
from models.db import db
from models.payrollModel import Payroll
from reportlab.pdfgen import canvas
import os

payroll = Blueprint("payroll", __name__)

# ===========================
# GET ALL PAYROLL
# ===========================
@payroll.route("/payroll", methods=["GET"])
def get_payroll():

    data = Payroll.query.all()

    result = []

    for p in data:
        result.append({
            "id": p.id,
            "employee_name": p.employee_name,
            "emp_id": p.emp_id,
            "basic": p.basic,
            "bonus": p.bonus,
            "tax": p.tax,
            "leaves": p.leaves,
            "net_salary": p.net_salary,
            "month": p.month
        })

    return jsonify(result)


# ===========================
# CREATE PAYROLL
# ===========================
@payroll.route("/payroll", methods=["POST"])
def create_payroll():

    try:

        data = request.json

        basic = float(data["basic"])
        bonus = float(data["bonus"])
        tax = float(data["tax"])
        leaves = float(data["leaves"])

        net = basic + bonus - tax - leaves

        payroll_data = Payroll(
            employee_name=data["employee_name"],
            emp_id=str(data["emp_id"]),
            basic=basic,
            bonus=bonus,
            tax=tax,
            leaves=leaves,
            net_salary=net,
            month=data["month"]
        )

        db.session.add(payroll_data)
        db.session.commit()

        return jsonify({
            "message": "Payroll Generated Successfully",
            "net_salary": net
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ===========================
# DOWNLOAD PAYSLIP
# ===========================
@payroll.route("/payroll/payslip/<emp_id>")
def generate_payslip(emp_id):

    data = Payroll.query.filter_by(emp_id=emp_id).first()

    if not data:
        return jsonify({"message": "No Payroll Found"}), 404

    filename = f"payslip_{emp_id}.pdf"

    c = canvas.Canvas(filename)

    c.setFont("Helvetica-Bold", 16)
    c.drawString(180, 800, "SMART HRMS PAYSLIP")

    c.setFont("Helvetica", 12)

    c.drawString(80, 760, f"Employee Name : {data.employee_name}")
    c.drawString(80, 740, f"Employee ID : {data.emp_id}")
    c.drawString(80, 720, f"Month : {data.month}")

    c.drawString(80, 680, f"Basic Salary : {data.basic}")
    c.drawString(80, 660, f"Bonus : {data.bonus}")
    c.drawString(80, 640, f"Tax : {data.tax}")
    c.drawString(80, 620, f"Leave Deduction : {data.leaves}")

    c.setFont("Helvetica-Bold", 14)
    c.drawString(80, 580, f"Net Salary : ₹ {data.net_salary}")

    c.save()

    return send_file(filename, as_attachment=True)