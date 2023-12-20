from rest_framework import serializers
from .models import UserA, Drone, DroneStorage, Flight


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


class FlightSerializer(serializers.ModelSerializer):
    serial_number = serializers.CharField(write_only=True)

    class Meta:
        model = Flight
        fields = ['serial_number', 'purpose', 'start_coordinates',
                  'end_coordinates', 'date', 'start_time', 'end_time']

    def create(self, validated_data):
        serial_number = validated_data.pop('serial_number')
        drone = Drone.objects.get(serial_number=serial_number)
        flight = Flight.objects.create(drone=drone, **validated_data)
        return flight
