from django.db import models
from django.conf import settings

class MockOralSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    examiner_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('pass', 'Pass'), ('fail', 'Fail')], null=True, blank=True)
    topics_covered = models.TextField(blank=True)
    questions_asked = models.TextField(blank=True)

    def __str__(self):
        return f"Mock Oral Session for {self.user.username} on {self.created_at}"