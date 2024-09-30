from django.db import models
from django.conf import settings

class Gouge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    examiner_name = models.CharField(max_length=100)
    date = models.DateField()
    outcome = models.CharField(max_length=10, choices=[('pass', 'Pass'), ('fail', 'Fail')])
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Gouge for {self.examiner_name} on {self.date}"