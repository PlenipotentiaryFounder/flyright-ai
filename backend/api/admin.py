from django.contrib import admin
from chat.models import Conversation, Message
from flashcards.models import Flashcard, FlashcardSet
from gouge.models import Gouge
from mockoral.models import MockOralSession
from profiles.models import Profile
from analytics.models import UserActivity, PerformanceMetric

# Register your models here
admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(Flashcard)
admin.site.register(FlashcardSet)
admin.site.register(Gouge)
admin.site.register(MockOralSession)
admin.site.register(Profile)
admin.site.register(UserActivity)
admin.site.register(PerformanceMetric)
