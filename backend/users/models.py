from django.db import models
import hashlib
import random
import string


class UserA(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        hashed_password = hashlib.sha256(
            self.password.encode('utf-8')).hexdigest()
        self.password = hashed_password
        super(UserA, self).save(*args, **kwargs)


class Drone(models.Model):
    DRONE_STATUS_CHOICES = [
        ('ok', 'Ok'),
        ('damaged', 'Damaged'),
        ('destroyed', 'Destoryed'),
    ]

    name = models.CharField(max_length=100)
    image = models.CharField(
        max_length=255, default='https://drones.measur.ca/cdn/shop/products/DJIMavi3T-01_3062x.png?v=1664287604')
    serial_number = models.CharField(max_length=6, unique=True)
    status = models.CharField(
        max_length=12, choices=DRONE_STATUS_CHOICES, default='ok')
    owner = models.ForeignKey(
        UserA, on_delete=models.CASCADE, related_name='drones')

    def save(self, *args, **kwargs):
        if not self.serial_number:
            self.serial_number = ''.join(random.choices(
                string.ascii_uppercase + string.digits, k=6))
        super(Drone, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class DroneStorage(models.Model):
    model = models.CharField(max_length=100)
    image = models.CharField(
        max_length=255, default='https://example.com/default-drone-image.png')
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.model
