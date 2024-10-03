from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

class UserPreferences(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    dark_mode = models.BooleanField(default=False)
    language = models.CharField(max_length=10, default='en')
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    show_progress_charts = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username}'s preferences"