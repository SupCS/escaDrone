from django.test import TestCase
from .models import UserA
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

class CheckUserTestCase(TestCase):
    
    def setUp(self):
        user = UserA(username="testuser", password="password123")
        user.save()
    
    def test_correct_credentials(self):
        hashed_password = hash_password("password123")
        response = self.client.post('/api/user-check/', {'username': 'testuser', 'password': hashed_password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'message': True})

    def test_incorrect_credentials(self):
        response = self.client.post('/api/user-check/', {'username': 'wronguser', 'password': 'wrongpassword'}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'message': False})
