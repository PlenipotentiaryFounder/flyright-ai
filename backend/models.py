from django.db import models
from django.contrib.auth.models import User

class Scenario(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    stage = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    document = models.FileField(upload_to='documents/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    question_text = models.TextField()
    correct_answer = models.TextField()
    user_answer = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('unanswered', 'Unanswered'), ('correct', 'Correct'), ('incorrect', 'Incorrect')], default='unanswered')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question_text

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    performance_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Report for {self.user.username} on {self.scenario.title}"

class Examiner(models.Model):
    name = models.CharField(max_length=255)
    reviews = models.TextField()

    def __str__(self):
        return self.name