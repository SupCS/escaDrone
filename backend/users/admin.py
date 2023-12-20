from django.contrib import admin
from .models import UserA, Drone, DroneStorage, Flight


class UserAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        # Перевіряємо чи існує
        existing_user = UserA.objects.filter(username=obj.username).first()

        if existing_user and existing_user != obj:
            # Помилка, якщо вже є
            raise ValueError("Користувач з таким логіном вже існує")

        # Зберігаємо об'єкт
        super().save_model(request, obj, form, change)


admin.site.register(UserA, UserAdmin)
admin.site.register(Drone)
admin.site.register(DroneStorage)
admin.site.register(Flight)
