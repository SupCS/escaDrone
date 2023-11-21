from django.urls import path
from . import views


urlpatterns = [
    path('users/', views.ListUsers.as_view()),
    path('user-check/', views.CheckUser.as_view()),
    path('user-drones/<str:username>/', views.UserDrones.as_view()),
    path('update-drone-status/', views.UpdateDroneStatus.as_view()),
    path('drone-storage/', views.DroneStorageList.as_view(),
         name='drone-storage-list'),
    path('add-drone-to-inventory/', views.AddDroneToInventory.as_view(),
         name='add-drone-to-inventory'),
]
