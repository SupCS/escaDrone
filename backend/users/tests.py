from django.test import TestCase
from .models import UserA
import hashlib
from unittest.mock import patch
from .models import UserA, DroneStorage, Drone


def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


class CheckUserTestCase(TestCase):

    def setUp(self):
        user = UserA(username="testuser", password="password123")
        user.save()

    def test_correct_credentials(self):
        hashed_password = hash_password("password123")
        response = self.client.post(
            '/api/user-check/', {'username': 'testuser', 'password': hashed_password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'message': True})

    def test_incorrect_credentials(self):
        response = self.client.post(
            '/api/user-check/', {'username': 'wronguser', 'password': 'wrongpassword'}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'message': False})


class UserDronesTestCase(TestCase):

    def setUp(self):
        self.user = UserA.objects.create(username="user1", password="pass1")
        Drone.objects.create(name="Drone1", owner=self.user,
                             serial_number="123456", status='ok')
        Drone.objects.create(name="Drone2", owner=self.user,
                             serial_number="654321", status='ok')

    def test_user_drones(self):
        response = self.client.get(f'/api/user-drones/{self.user.username}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)


class UpdateDroneStatusTestCase(TestCase):

    def setUp(self):
        user = UserA.objects.create(username="user1", password="pass1")
        self.drone = Drone.objects.create(
            name="Drone1", owner=user, serial_number="123456", status='ok')

    def test_update_drone_status(self):
        response = self.client.post('/api/update-drone-status/', {
                                    'serial_number': self.drone.serial_number, 'status': 'damaged'}, content_type="application/json")
        self.drone.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.drone.status, 'damaged')


class DroneStorageListTestCase(TestCase):

    def setUp(self):
        DroneStorage.objects.create(model="Model1", quantity=10)

    def test_drone_storage_list(self):
        response = self.client.get('/api/drone-storage/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_add_drone_to_storage(self):
        response = self.client.post(
            '/api/drone-storage/', {'model': 'Model2', 'quantity': 5}, content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(DroneStorage.objects.count(), 2)


class AddDroneToInventoryTestCase(TestCase):

    def setUp(self):
        self.user = UserA.objects.create(username="user1", password="pass1")
        DroneStorage.objects.create(model="Model1", quantity=5)

    @patch('users.views.generate_unique_serial_number')
    def test_add_drone_to_inventory(self, mock_generate_unique_serial_number):
        mock_generate_unique_serial_number.return_value = "123ABC"
        response = self.client.post('/api/add-drone-to-inventory/', {
                                    'droneModel': 'Model1', 'username': self.user.username}, content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Drone.objects.last().serial_number, "123ABC")
