from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import timedelta

# Create your models here.

class Conversation(models.Model):
    title = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.title:
            # Get the first message of the conversation
            first_message = self.message_set.first()
            if first_message:
                # Extract the first 5 or fewer words from the first message
                words = first_message.content.split()[:5]
                title = ' '.join(words)
                # Calculate the time ago since the conversation started
                time_ago = now() - self.created_at
                if time_ago < timedelta(minutes=1):
                    time_ago_str = f"{int(time_ago.total_seconds())} seconds ago"
                elif time_ago < timedelta(hours=1):
                    time_ago_str = f"{int(time_ago.total_seconds() // 60)} minutes ago"
                elif time_ago < timedelta(days=1):
                    time_ago_str = f"{int(time_ago.total_seconds() // 3600)} hours ago"
                else:
                    time_ago_str = f"{int(time_ago.total_seconds() // 86400)} days ago"
                self.title = f"{title} - {time_ago_str}"
        super().save(*args, **kwargs)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.CharField(max_length=255)  # 'user' or 'ai'
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    # other fields...

class Flashcard(models.Model):
    question = models.TextField()
    answer = models.TextField()
    # Add any other fields you need

    def __str__(self):
        return self.question
