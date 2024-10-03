Section 1: Custom User Model and User Preferences
CustomUser Table
python
Copy code
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Using email as username
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    # Inherited fields from AbstractUser: password, is_active, is_staff, is_superuser, last_login, etc.
Explanation: This table extends AbstractUser, giving us the basic user fields like email, first/last name, and inheriting password, is_staff, is_active, and others.
UserPreferences Table
python
Copy code
class UserPreferences(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    dark_mode = models.BooleanField(default=False)
    language = models.CharField(max_length=10, default='en')
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    show_progress_charts = models.BooleanField(default=True)
Explanation: This table stores user-specific preferences like dark mode, language, and notifications.
Section 2: Chat and Conversations
Conversation Table
python
Copy code
class Conversation(models.Model):
    title = models.CharField(max_length=255)  # Title of the conversation
    topic = models.CharField(max_length=255, null=True, blank=True)  # Optional topic
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL)
Explanation: This table holds data about conversations, including the title, topic, and the user who created it.
Message Table
python
Copy code
class Message(models.Model):
    conversation = models.ForeignKey(Conversation, related_name="messages", on_delete=models.CASCADE)
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    content = models.TextField()  # The message content
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
Explanation: Messages are linked to a conversation, with details about the sender and a timestamp.
Participant Table
python
Copy code
class Participant(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
Explanation: This table keeps track of which users are participants in a conversation and when they joined.
Section 3: Flashcards
FlashcardCategory Table
python
Copy code
class FlashcardCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
Explanation: Stores the categories of flashcards.
FlashcardSet Table
python
Copy code
class FlashcardSet(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
Explanation: This stores user-created sets of flashcards.
Flashcard Table
python
Copy code
class Flashcard(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(FlashcardCategory, null=True, on_delete=models.SET_NULL)
    set = models.ForeignKey(FlashcardSet, on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField()
    difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=1)
    status = models.BooleanField(default=False)  # Known/Understood
    created_at = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(null=True, blank=True)
    times_used = models.IntegerField(default=0)
Explanation: Stores individual flashcards with the option to assign them to categories and sets.
FlashcardUsage Table
python
Copy code
class FlashcardUsage(models.Model):
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    last_reviewed = models.DateTimeField(null=True, blank=True)
    next_review_due = models.DateTimeField(null=True, blank=True)
    proficiency_score = models.IntegerField(default=0)
Explanation: Tracks when a flashcard was last reviewed and the user’s proficiency score.
Section 4: Mock Oral Sessions
MockOralSection Table
python
Copy code
class MockOralSection(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
Explanation: Stores sections of a mock oral session (such as different exam topics).
MockOralSession Table with ACS Field
python
Copy code
class MockOralSession(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    section = models.ForeignKey(MockOralSection, null=True, on_delete=models.SET_NULL)
    duration = models.IntegerField()  # Duration in minutes
    score = models.IntegerField()  # Score between 0 and 100
    acs_type = models.CharField(max_length=255)  # ACS type (e.g., Airplane Single Engine Private)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
Explanation: Tracks details of a mock oral session, including the ACS type, score, and time taken.
Section 5: Gouge and Examiner Profiles
ExaminerProfile Table
python
Copy code
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
Explanation: Tracks the details of examiners including ratings and statistics.
Gouge Table
python
Copy code
class Gouge(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    examiner = models.ForeignKey(ExaminerProfile, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    gouge_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=3)  # Rating out of 5
    pass_or_fail = models.CharField(choices=[('pass', 'Pass'), ('fail', 'Fail')], max_length=10)
    flight_difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=2)
    oral_difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=2)
    stress_level = models.IntegerField(default=3)  # Scale from 1 to 5
    unexpected_elements = models.TextField(null=True, blank=True)
Explanation: Stores gouge reports by users, tracking details of the checkride, exam difficulty, and pass/fail outcomes.
Section 6: Profiles
Profile Table
python
Copy code
class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
Explanation: Stores user profile information, including optional bio, location, and birth date.
Section 7: Notifications
Notification Table
python
Copy code
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
Explanation: Stores notifications for users about important updates or reminders.
Section 8: Analytics
UserActivity Table
python
Copy code
class UserActivity(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=255)  # e.g., 'login', 'flashcard_review'
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(null=True, blank=True)  # Additional details of the activity
Explanation: Tracks user activities like reviewing flashcards or logging in.
PerformanceMetric Table
python
Copy code
class PerformanceMetric(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    metric_type = models.CharField(max_length=255)  # e.g., 'flashcard_review_time'
    value = models.FloatField()  # Actual metric value
    timestamp = models.DateTimeField(auto_now_add=True)
Explanation: Tracks performance metrics for users, such as time spent reviewing flashcards.