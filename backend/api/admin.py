from django.contrib import admin
from chat.models import Conversation, Message
from flashcards.models import Flashcard, FlashcardSet

from mockoral.models import MockOralSession
from profiles.models import Profile
from analytics.models import UserActivity, PerformanceMetric

# Register your models here **update 12/29/2024**   chat told me to remove the gouge admin.py from here and register it in the gouge app instead saying that it is python best practices    
admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(Flashcard)
admin.site.register(FlashcardSet)

admin.site.register(MockOralSession)
admin.site.register(Profile)
admin.site.register(UserActivity)
admin.site.register(PerformanceMetric)
