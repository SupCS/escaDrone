from rest_framework import serializers
from .models import UserA

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserA
        fields = '__all__'
