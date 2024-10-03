from django.db import models
from django.conf import settings
from users.models import CustomUser

class ExaminerProfile(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255, null=True, blank=True)
    organization = models.CharField(max_length=255, null=True, blank=True)
    years_of_experience = models.IntegerField()
    avg_rating = models.FloatField(default=0)
    feedback_count = models.IntegerField(default=0)
    avg_pass_rate = models.FloatField(default=0)
    avg_flight_difficulty = models.FloatField(default=0)
    avg_oral_difficulty = models.FloatField(default=0)

class Gouge(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    examiner = models.ForeignKey(ExaminerProfile, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    gouge_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(default=3)
    pass_or_fail = models.CharField(choices=[('pass', 'Pass'), ('fail', 'Fail')], max_length=10)
    flight_difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=2)
    oral_difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=2)
    stress_level = models.IntegerField(default=3)
    unexpected_elements = models.TextField(null=True, blank=True)

class GougeFeedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    gouge = models.ForeignKey(Gouge, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    feedback_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)