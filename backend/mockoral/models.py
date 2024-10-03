from django.db import models
from django.conf import settings
from users.models import CustomUser

class MockOralSection(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

class MockOralSession(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    section = models.ForeignKey(MockOralSection, null=True, on_delete=models.SET_NULL)
    duration = models.IntegerField()
    score = models.IntegerField()
    acs_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    examiner_name = models.CharField(max_length=100)
    status = models.CharField(choices=[('pass', 'Pass'), ('fail', 'Fail')], max_length=10, null=True, blank=True)
    topics_covered = models.TextField(blank=True)
    questions_asked = models.TextField(blank=True)

class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    session = models.ForeignKey(MockOralSession, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    feedback_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)