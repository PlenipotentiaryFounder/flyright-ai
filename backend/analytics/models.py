from django.db import models
from users.models import CustomUser

class UserActivity(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(null=True, blank=True)

class PerformanceMetric(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    metric_type = models.CharField(max_length=255)
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)