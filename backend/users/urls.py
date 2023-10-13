from django.urls import path
from . import views


urlpatterns = [
    path('', views.ListUsers.as_view()),
]
