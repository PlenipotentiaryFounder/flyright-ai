from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ConversationViewSet,
    WeaviateSearchViewSet,
    RegisterView,
    LoginView,  # Add this line
    welcome_page,
    MessageView,
    FlashcardViewSet,
    welcome_page,
    chat_weaviate,
    mockoral_weaviate
)

router = DefaultRouter()
router.register(r'conversations', ConversationViewSet)
router.register(r'search', WeaviateSearchViewSet, basename='weaviate-search')
router.register(r'flashcards', FlashcardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', welcome_page, name='welcome'),
    path('weaviate/search', MessageView.as_view(), name='weaviate-search'),
    path('welcome/', welcome_page, name='welcome'),
    path('chat/', chat_weaviate, name='chat-weaviate'),
    path('mockoral/', mockoral_weaviate, name='mockoral-weaviate'),
]
