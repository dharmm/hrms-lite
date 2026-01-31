from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


#------Add Employee API------------
@api_view(['POST'])
def add_employee(request):
    serializer = EmployeeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#-------List Employees API--------
@api_view(['GET'])
def list_employees(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)


#---------Delete Employee API-----------

@api_view(['DELETE'])
def delete_employee(request, id):
    try:
        emp = Employee.objects.get(id=id)
        emp.delete()
        return Response({"message": "Employee deleted"}, status=204)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)


#-----Mark Attendance API-------
@api_view(['POST'])
def mark_attendance(request):
    serializer = AttendanceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

#--------View Attendance per Employee--------
@api_view(['GET'])
def employee_attendance(request, employee_id):
    records = Attendance.objects.filter(employee__employee_id=employee_id)
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)
