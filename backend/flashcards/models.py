from django.db import models
from users.models import CustomUser

class FlashcardCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)

class FlashcardSet(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    creatorType = models.CharField(max_length=255, choices=[('user', 'User'), ('flyright', 'FlyRight')], default='user')

class Flashcard(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(FlashcardCategory, null=True, on_delete=models.SET_NULL)
    set = models.ForeignKey(FlashcardSet, on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField()
    difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=1)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_used = models.DateTimeField(null=True, blank=True)
    times_used = models.IntegerField(default=0)

class FlashcardUsage(models.Model):
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    last_reviewed = models.DateTimeField(null=True, blank=True)
    next_review_due = models.DateTimeField(null=True, blank=True)
    proficiency_score = models.IntegerField(default=0)