from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserA, Drone
from .serializers import TaskSerializer
import json
from django.http import JsonResponse
from .serializers import DroneSerializer


class ListUsers(APIView):
    def get(self, request):
        users = UserA.objects.all()
        serializer = TaskSerializer(users, many=True)
        return Response(serializer.data)


class CheckUser(APIView):
    def post(self, request):
        info = json.loads(request.body.decode('utf-8'))
        username = info.get('username')
        password = info.get('password')
        user = UserA.objects.filter(
            username=username, password=password).exists()
        print(user)
        if user:
            return JsonResponse({'message': True})
        else:
            return JsonResponse({'message': False})


class UserDrones(APIView):
    def get(self, request, username):
        user = UserA.objects.get(username=username)
        drones = Drone.objects.filter(owner=user)
        serializer = DroneSerializer(drones, many=True)
        return Response(serializer.data)
