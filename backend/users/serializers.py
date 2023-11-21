from rest_framework import serializers
from .models import UserA, Drone, DroneStorage


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserA
        fields = '__all__'


class DroneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drone
        fields = ['name', 'image', 'serial_number', 'status', 'owner']


class DroneStorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DroneStorage
        fields = ['model', 'image', 'quantity']
