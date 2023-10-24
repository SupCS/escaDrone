from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserA
from .serializers import TaskSerializer
import json
from django.http import JsonResponse


class ListUsers(APIView):
    def get(self, request):
        users = UserA.objects.all()
        serializer = TaskSerializer(users, many=True)
        return Response(serializer.data)
    
class CheckUser(APIView):
    def post(self, request):
        info  = json.loads(request.body.decode('utf-8'))
        username = info.get('username')
        password = info.get('password')
        user = UserA.objects.filter(username=username, password=password).exists()
        print(user)
        if user:
            return JsonResponse({'message': True})
        else:
            return JsonResponse({'message': False})
        
