from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserA, Drone, DroneStorage
from .serializers import TaskSerializer, DroneSerializer, DroneStorageSerializer
import json
import random
from django.core.mail import send_mail


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


class UpdateDroneStatus(APIView):
    def post(self, request):
        data = request.data
        serial_number = data.get('serial_number')
        new_status = data.get('status')

        drone = Drone.objects.get(serial_number=serial_number)
        drone.status = new_status
        drone.save()

        return Response({'message': 'Status updated successfully'})


class DroneStorageList(APIView):
    def get(self, request):
        drones = DroneStorage.objects.all()
        serializer = DroneStorageSerializer(drones, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DroneStorageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddDroneToInventory(APIView):
    def post(self, request):
        try:
            # Отримати параметри з тіла запиту
            data = request.data
            droneModel = data.get('droneModel')
            username = data.get('username')

            # Знайти дрон на складі за моделлю
            drone_storage = DroneStorage.objects.get(model=droneModel)

            if drone_storage.quantity > 0:
                # Знайти користувача за ім'ям
                user = UserA.objects.get(username=username)
                # Створити новий дрон та зберегти його
                Drone.objects.create(
                    name=drone_storage.model,
                    image=drone_storage.image,
                    serial_number=generate_unique_serial_number(),
                    status='ok',  # Статус за замовчуванням
                    owner=user,
                )

                # Оновлення кількості на складі
                drone_storage.quantity -= 1
                drone_storage.save()

                return Response({'message': 'Запит створено. Поставка в дорозі!'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'На складі немає доступних дронів'}, status=status.HTTP_400_BAD_REQUEST)
        except DroneStorage.DoesNotExist:
            return Response({'message': 'Дрон на складі не знайдено'}, status=status.HTTP_404_NOT_FOUND)


def generate_unique_serial_number():
    while True:
        # Генеруємо випадковий серійний номер з 6 чисел
        serial_number = ''.join(random.choices('0123456789', k=6))

        # Перевіряємо чи нема вже такого
        if not Drone.objects.filter(serial_number=serial_number).exists():
            return serial_number


class SendEmail(APIView):
    def post(self, request):
        # Отримання данних з запиту
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        # Формування і відправлення на email
        try:
            send_mail(
                subject=f'Нове повідомлення від {name}',
                message=message,
                from_email=email,
                recipient_list=['supezbiz@gmail.com'],
                fail_silently=False,
            )
            return Response({'status': 'Email sent successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
