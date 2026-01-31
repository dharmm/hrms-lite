from django.urls import path
from .views import *

urlpatterns = [
    path('employees/', list_employees),
    path('employees/add/', add_employee),
    path('employees/delete/<int:id>/', delete_employee),

    path('attendance/add/', mark_attendance),
    path('attendance/<str:employee_id>/', employee_attendance),
]
