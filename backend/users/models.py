from django.db import models
import hashlib
# Create your models here.
class UserA(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        hashed_password = hashlib.sha256(self.password.encode('utf-8')).hexdigest()
        self.password = hashed_password
        super(UserA, self).save(*args, **kwargs)