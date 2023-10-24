from django.urls import path
from . import views


urlpatterns = [
    path('users/', views.ListUsers.as_view()),
    path('user-check/', views.CheckUser.as_view()),
]
