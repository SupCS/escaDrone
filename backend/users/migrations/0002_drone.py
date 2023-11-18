# Generated by Django 4.2.6 on 2023-11-18 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Drone",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "image",
                    models.CharField(
                        default="https://drones.measur.ca/cdn/shop/products/DJIMavi3T-01_3062x.png?v=1664287604",
                        max_length=255,
                    ),
                ),
                ("serial_number", models.CharField(max_length=6, unique=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("ok", "Ok"),
                            ("damaged", "Damaged"),
                            ("destroyed", "Destoryed"),
                        ],
                        default="ok",
                        max_length=12,
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="drones",
                        to="users.usera",
                    ),
                ),
            ],
        ),
    ]
