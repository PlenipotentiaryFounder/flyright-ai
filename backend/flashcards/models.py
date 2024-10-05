from django.db import models
from users.models import CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()

class FlashcardCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    creatorType = models.CharField(max_length=255, choices=[('user', 'User'), ('flyright', 'FlyRight')], default='user')
    ai_generated = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

class FlashcardSet(models.Model):
    name = models.CharField(max_length=255)
    creatorType = models.CharField(max_length=255, choices=[('user', 'User'), ('flyright', 'FlyRight')], default='user')
    ai_generated = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        unique_together = [['name', 'user'], ['name', 'creatorType']]

class Flashcard(models.Model):
    category = models.ForeignKey('FlashcardCategory', on_delete=models.CASCADE)
    set = models.ForeignKey('FlashcardSet', on_delete=models.CASCADE)
    question = models.TextField()
    bold_question = models.CharField(max_length=255)  # New field
    answer = models.TextField()
    bold_answer = models.CharField(max_length=255)  # New field
    difficulty = models.IntegerField(default=1)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_used = models.DateTimeField(null=True, blank=True)
    times_used = models.IntegerField(default=0)
    creatorType = models.CharField(max_length=255, choices=[('user', 'User'), ('flyright', 'FlyRight')], default='user')
    ai_generated = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        unique_together = ('question', 'set')

    def __str__(self):
        return self.question

class FlashcardUsage(models.Model):
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    last_reviewed = models.DateTimeField(null=True, blank=True)
    next_review_due = models.DateTimeField(null=True, blank=True)
    proficiency_score = models.IntegerField(default=0)